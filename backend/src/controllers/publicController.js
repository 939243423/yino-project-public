const db = require('../config/db');

const getQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

exports.getBanners = async (req, res) => {
  const { category } = req.query;
  try {
    let query = 'SELECT * FROM banners WHERE is_active = 1';
    let params = [];
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY sort_order ASC, created_at ASC';
    
    const banners = await getQuery(query, params);
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.getNews = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  
  try {
    let query = 'SELECT * FROM news WHERE is_published = 1';
    let countQuery = 'SELECT COUNT(*) as total FROM news WHERE is_published = 1';
    let params = [];
    
    if (category) {
      query += ' AND category = ?';
      countQuery += ' AND category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const queryParams = [...params, parseInt(limit), parseInt(offset)];
    
    const news = await getQuery(query, queryParams);
    const countResult = await getQuery(countQuery, params);
    const total = countResult[0].total;
    
    res.json({
      data: news,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.getNewsDetail = async (req, res) => {
  try {
    const newsItem = await getQuery('SELECT * FROM news WHERE id = ? AND is_published = 1', [req.params.id]);
    if (newsItem.length === 0) {
      return res.status(404).json({ message: '未找到该新闻' });
    }
    // Update views count
    db.run('UPDATE news SET views = views + 1 WHERE id = ?', [req.params.id]);
    res.json(newsItem[0]);
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const jobs = await getQuery(
      'SELECT * FROM jobs WHERE is_active = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [parseInt(limit), parseInt(offset)]
    );
    const countResult = await getQuery('SELECT COUNT(*) as total FROM jobs WHERE is_active = 1');
    const total = countResult[0].total;

    res.json({
      data: jobs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.submitInquiry = async (req, res) => {
  const { name, phone, email, content } = req.body;
  if (!name || !email || !content) {
    return res.status(400).json({ message: '请填写必填项（姓名、邮箱、内容）' });
  }
  
  try {
    const runQuery = (query, params = []) => {
      return new Promise((resolve, reject) => {
        db.run(query, params, function(err) {
          if (err) reject(err);
          resolve(this);
        });
      });
    };
    
    await runQuery(
      'INSERT INTO inquiries (name, phone, email, content) VALUES (?, ?, ?, ?)',
      [name, phone, email, content]
    );
    res.status(201).json({ message: '提交成功，我们将尽快与您联系' });
  } catch (err) {
    res.status(500).json({ message: '提交失败，请稍后重试', error: err.message });
  }
};
