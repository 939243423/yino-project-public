const axios = require('axios');
const crypto = require('crypto');

/**
 * Translates text using Baidu Translation API.
 * Handles HTML tag protection and multi-line integrity.
 * @param {string|string[]} text - Text to translate
 * @param {string} to - Target language code (default: 'en')
 * @returns {Promise<string|string[]>} - Translated text
 */
const translateText = async (text, to = 'en') => {
  if (!text) return text;
  if (Array.isArray(text) && text.length === 0) return [];

  const appid = (process.env.BAIDU_APP_ID || '').trim();
  const key = (process.env.BAIDU_API_KEY || '').trim();

  if (!appid || !key) {
    console.warn('Baidu API credentials missing, skipping translation');
    return text;
  }

  const isArray = Array.isArray(text);
  const inputList = isArray ? text : [text];
  
  // 1. Identify non-empty items to translate
  const nonEmpties = inputList
    .map((content, index) => ({ content, index }))
    .filter(item => item.content && String(item.content).trim().length > 0);
    
  if (nonEmpties.length === 0) return text;

  // Helper to strip outer tags/entities/spaces from the edges of a line
  const stripOuter = (text) => {
    let prefix = '';
    let suffix = '';
    let core = text;
    
    // Regex for a single tag or entity at the start
    const startItemRegex = /^(?:<(?:[^"'>]|"[^"]*"|'[^']*')*>|&[a-z0-9]+;|&#[0-9]+;|&#x[a-f0-9]+;)/i;
    while (true) {
      const match = core.match(startItemRegex);
      if (match) {
        prefix += match[0];
        core = core.substring(match[0].length);
      } else if (core.length > 0 && /^\s/.test(core)) {
        prefix += core[0];
        core = core.substring(1);
      } else {
        break;
      }
    }
    
    // Regex for a single tag or entity at the end
    const endItemRegex = /(?:<(?:[^"'>]|"[^"]*"|'[^']*')*>|&[a-z0-9]+;|&#[0-9]+;|&#x[a-f0-9]+;)$/i;
    while (true) {
      const match = core.match(endItemRegex);
      if (match) {
        suffix = match[0] + suffix;
        core = core.substring(0, core.length - match[0].length);
      } else if (core.length > 0 && /\s$/.test(core)) {
        suffix = core[core.length - 1] + suffix;
        core = core.substring(0, core.length - 1);
      } else {
        break;
      }
    }
    return { prefix, suffix, core };
  };

  // 2. Protect HTML tags/entities and split into sub-lines
  const tagMap = [];
  const flatLines = [];
  const fieldLineRanges = []; // { start, count } mapping for each non-empty item
  const lineDetails = []; // To store prefix/suffix for each flat line
  
  const tagRegex = /<(?:[^"'>]|"[^"]*"|'[^']*')*>/g;
  const entityRegex = /&[a-z0-9]+;|&#[0-9]+;|&#x[a-f0-9]+;/gi;

  nonEmpties.forEach(item => {
    const lines = String(item.content).split('\n');
    const start = flatLines.length;
    
    lines.forEach(line => {
      if (line.trim().length === 0) {
        flatLines.push('{EL}'); 
        lineDetails.push({ prefix: '', suffix: '', hasCore: false });
      } else {
        const { prefix, suffix, core } = stripOuter(line);
        
        if (core.length === 0) {
          flatLines.push('{EL}');
          lineDetails.push({ prefix, suffix, hasCore: false });
        } else {
          let t = core;
          // Protect internal tags and entities
          t = t.replace(tagRegex, (match) => {
            const placeholder = `{T${tagMap.length}}`;
            tagMap.push(match);
            return placeholder;
          });
          t = t.replace(entityRegex, (match) => {
            const placeholder = `{T${tagMap.length}}`;
            tagMap.push(match);
            return placeholder;
          });
          flatLines.push(t);
          lineDetails.push({ prefix, suffix, hasCore: true });
        }
      }
    });
    
    fieldLineRanges.push({ start, count: lines.length });
  });

  // 3. Translate in batches
  const BATCH_CHAR_LIMIT = 4000; 
  const allResults = [];
  
  const sendBatch = async (lines) => {
    const q = lines.join('\n');
    const salt = Math.floor(Math.random() * 1000000000).toString();
    const signString = appid + q + salt + key;
    const sign = crypto.createHash('md5').update(signString, 'utf8').digest('hex');

    const data = new URLSearchParams();
    data.append('q', q);
    data.append('from', 'auto');
    data.append('to', to);
    data.append('appid', appid);
    data.append('salt', salt);
    data.append('sign', sign);

    const response = await axios({
      method: 'post',
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: data.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 30000
    });

    if (response.data && response.data.trans_result) {
      return response.data.trans_result.map(item => item.dst);
    } else if (response.data && response.data.error_code) {
      throw new Error(`Baidu API Error [${response.data.error_code}]: ${response.data.error_msg}`);
    }
    throw new Error('Baidu API returned no result');
  };

  try {
    let currentBatch = [];
    let currentLength = 0;

    for (const line of flatLines) {
      if (currentLength + line.length + 1 > BATCH_CHAR_LIMIT && currentBatch.length > 0) {
        const batchResult = await sendBatch(currentBatch);
        allResults.push(...batchResult);
        currentBatch = [];
        currentLength = 0;
      }
      currentBatch.push(line);
      currentLength += line.length + 1;
    }
    
    if (currentBatch.length > 0) {
      const batchResult = await sendBatch(currentBatch);
      allResults.push(...batchResult);
    }

    // 4. Reassemble the results back into original fields
    if (allResults.length === flatLines.length) {
      const finalized = fieldLineRanges.map(range => {
        const fieldLines = allResults.slice(range.start, range.start + range.count);
        
        return fieldLines.map((line, i) => {
          const detail = lineDetails[range.start + i];
          
          // If the line was empty or only tags that were stripped, return the stripped tags
          if (!detail.hasCore) return detail.prefix + detail.suffix;
          
          // If it was the empty line placeholder
          if (line.trim() === '{EL}' || line.trim() === '{ EL }') return detail.prefix + detail.suffix;
          
          // Restore Tags (more robust regex to handle missing brackets or added spaces)
          let res = line.replace(/[\[\{\(]?\s*T\s*(\d+)\s*[\]\}\)]?/g, (match, index) => {
            const idx = parseInt(index, 10);
            return tagMap[idx] !== undefined ? tagMap[idx] : match;
          });
          
          // Also clean up any lingering placeholders
          res = res.replace(/[\[\{\(]?\s*EL\s*[\]\}\)]?/gi, '');
          
          return detail.prefix + res + detail.suffix;
        }).join('\n');
      });

      // Reconstruct the full array (maintaining original positions)
      const output = isArray ? [...inputList] : [inputList[0]];
      nonEmpties.forEach((item, i) => {
        output[item.index] = finalized[i];
      });
      
      return isArray ? output : output[0];
    } else {
      console.warn(`Baidu result count mismatch: sent ${flatLines.length} lines, got ${allResults.length}. Falling back to original text.`);
      return text;
    }
  } catch (err) {
    console.error('Translation error:', err.message);
    return text;
  }
};

module.exports = {
  translateText
};
