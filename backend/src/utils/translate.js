const axios = require('axios');
const crypto = require('crypto');

/**
 * Translates text using Baidu Translation API.
 * @param {string|string[]} text - Text to translate
 * @param {string} to - Target language code (default: 'en')
 * @returns {Promise<string|string[]>} - Translated text
 */
/**
 * Translates text using Baidu Translation API.
 * Handles HTML tag protection to prevent URL/attribute corruption.
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
  
  // Tag protection logic
  const tagMap = [];
  const protectedList = inputList.map(item => {
    if (typeof item !== 'string') return item;
    
    // Simple regex for HTML tags
    return item.replace(/<[^>]+>/g, (match) => {
      const placeholder = `[[T${tagMap.length}]]`;
      tagMap.push(match);
      return placeholder;
    });
  });

  const q = protectedList.join('\n');
  const lineCounts = protectedList.map(t => String(t || '').split('\n').length);

  const salt = Math.floor(Math.random() * 1000000000).toString();
  const from = 'auto';
  const signString = appid + q + salt + key;
  const sign = crypto.createHash('md5').update(signString, 'utf8').digest('hex');

  const data = new URLSearchParams();
  data.append('q', q);
  data.append('from', from);
  data.append('to', to);
  data.append('appid', appid);
  data.append('salt', salt);
  data.append('sign', sign);

  try {
    const response = await axios({
      method: 'post',
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: data.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 10000
    });

    if (response.data && response.data.trans_result) {
      const allResults = response.data.trans_result.map(item => item.dst);
      
      const reconstructed = [];
      let currentIndex = 0;
      for (const count of lineCounts) {
        reconstructed.push(allResults.slice(currentIndex, currentIndex + count).join('\n'));
        currentIndex += count;
      }

      // Restore tags
      const finalized = reconstructed.map(item => {
        // Baidu might add spaces around brackets, e.g., "[[ T0 ]]"
        return item.replace(/\[\[\s*T(\d+)\s*\]\]/g, (match, index) => {
          const idx = parseInt(index, 10);
          return tagMap[idx] !== undefined ? tagMap[idx] : match;
        });
      });
      
      return isArray ? finalized : finalized[0];
    } else if (response.data && response.data.error_code) {
      console.error(`Baidu API Error [${response.data.error_code}]: ${response.data.error_msg}`);
      return text;
    }
    
    return text;
  } catch (err) {
    console.error('Translation network/request error:', err.message);
    return text;
  }
};

module.exports = {
  translateText
};
