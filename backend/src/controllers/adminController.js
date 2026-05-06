const db = require('../config/db');
const fs = require('fs');
const path = require('path');
const { translateText } = require('../utils/translate');


// Helper function to run DB queries with promises
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      resolve(this);
    });
  });
};

const getQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const deleteFile = (imageUrl) => {
  if (!imageUrl || !imageUrl.startsWith('/uploads/')) return;
  // Handle case where imageUrl might have query params or be just the base path
  const purePath = imageUrl.split('?')[0];
  const filePath = path.join(__dirname, '../../', purePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') return; // File already gone
      console.error(`Failed to delete file: ${filePath}`, err);
    }
    else console.log(`Deleted file: ${filePath}`);
  });
};

const extractImagesFromHtml = (html) => {
  if (!html) return [];
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const images = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1].startsWith('/uploads/')) {
      images.push(match[1]);
    }
  }
  return images;
};


exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '未上传文件' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.status(200).json({ url });
};

// --- Banners ---
exports.getBanners = async (req, res) => {
  try {
    const banners = await getQuery('SELECT * FROM banners ORDER BY sort_order ASC, created_at ASC');
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.createBanner = async (req, res) => {
  const { title_zh, title_en, description_zh, description_en, image_url, link, category, sort_order, is_active } = req.body;
  try {
    const result = await runQuery(
      'INSERT INTO banners (title_zh, title_en, description_zh, description_en, image_url, link, category, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title_zh, title_en, description_zh, description_en, image_url, link, category || 'home', sort_order || 0, is_active !== undefined ? is_active : 1]
    );
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  const { title_zh, title_en, description_zh, description_en, image_url, link, category, sort_order, is_active } = req.body;
  try {
    // Check if image changed to cleanup old file
    const oldBanner = await getQuery('SELECT image_url FROM banners WHERE id = ?', [req.params.id]);
    if (oldBanner.length > 0 && oldBanner[0].image_url !== image_url) {
      deleteFile(oldBanner[0].image_url);
    }

    await runQuery(
      'UPDATE banners SET title_zh = ?, title_en = ?, description_zh = ?, description_en = ?, image_url = ?, link = ?, category = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [title_zh, title_en, description_zh, description_en, image_url, link, category || 'home', sort_order || 0, is_active !== undefined ? is_active : 1, req.params.id]
    );
    res.json({ message: '更新成功' });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await getQuery('SELECT image_url FROM banners WHERE id = ?', [req.params.id]);
    if (banner.length > 0) {
      deleteFile(banner[0].image_url);
    }
    await runQuery('DELETE FROM banners WHERE id = ?', [req.params.id]);
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};


// --- News ---
exports.getNews = async (req, res) => {
  try {
    const news = await getQuery('SELECT * FROM news ORDER BY created_at ASC');
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.createNews = async (req, res) => {
  const { title_zh, title_en, description_zh, description_en, content_zh, content_en, cover_url, category, is_published, created_at } = req.body;
  try {
    const result = await runQuery(
      'INSERT INTO news (title_zh, title_en, description_zh, description_en, content_zh, content_en, cover_url, category, is_published, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title_zh, title_en, description_zh, description_en, content_zh, content_en, cover_url, category || 'news', is_published !== undefined ? is_published : 1, created_at || new Date().toISOString()]
    );
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.updateNews = async (req, res) => {
  const { title_zh, title_en, description_zh, description_en, content_zh, content_en, cover_url, category, is_published, created_at } = req.body;
  try {
    const oldItems = await getQuery('SELECT * FROM news WHERE id = ?', [req.params.id]);
    if (oldItems.length > 0) {
      const oldItem = oldItems[0];
      
      // Cleanup cover image
      if (oldItem.cover_url !== cover_url) {
        deleteFile(oldItem.cover_url);
      }
      
      // Cleanup images in content_zh and content_en
      const oldImages = [
        ...extractImagesFromHtml(oldItem.content_zh),
        ...extractImagesFromHtml(oldItem.content_en)
      ];
      const newImages = [
        ...extractImagesFromHtml(content_zh),
        ...extractImagesFromHtml(content_en)
      ];
      
      // Delete images that are in old but not in new
      oldImages.forEach(img => {
        if (!newImages.includes(img)) {
          deleteFile(img);
        }
      });
    }

    await runQuery(
      'UPDATE news SET title_zh = ?, title_en = ?, description_zh = ?, description_en = ?, content_zh = ?, content_en = ?, cover_url = ?, category = ?, is_published = ?, created_at = ? WHERE id = ?',
      [title_zh, title_en, description_zh, description_en, content_zh, content_en, cover_url, category || 'news', is_published !== undefined ? is_published : 1, created_at, req.params.id]
    );
    res.json({ message: '更新成功' });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const newsItems = await getQuery('SELECT * FROM news WHERE id = ?', [req.params.id]);
    if (newsItems.length > 0) {
      const newsItem = newsItems[0];
      // Cleanup cover
      deleteFile(newsItem.cover_url);
      
      // Cleanup content images
      const images = [
        ...extractImagesFromHtml(newsItem.content_zh),
        ...extractImagesFromHtml(newsItem.content_en)
      ];
      images.forEach(img => deleteFile(img));
    }
    await runQuery('DELETE FROM news WHERE id = ?', [req.params.id]);
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};


// --- Jobs ---
exports.getJobs = async (req, res) => {
  try {
    const jobs = await getQuery('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.createJob = async (req, res) => {
  const { title_zh, title_en, department_zh, department_en, location_zh, location_en, description_zh, description_en, requirements_zh, requirements_en, salary, is_active } = req.body;
  try {
    const result = await runQuery(
      `INSERT INTO jobs (title_zh, title_en, department_zh, department_en, location_zh, location_en, description_zh, description_en, requirements_zh, requirements_en, salary, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title_zh, title_en, department_zh, department_en, location_zh, location_en, description_zh, description_en, requirements_zh, requirements_en, salary, is_active !== undefined ? is_active : 1]
    );
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  const { title_zh, title_en, department_zh, department_en, location_zh, location_en, description_zh, description_en, requirements_zh, requirements_en, salary, is_active } = req.body;
  try {
    await runQuery(
      `UPDATE jobs SET title_zh = ?, title_en = ?, department_zh = ?, department_en = ?, location_zh = ?, location_en = ?, description_zh = ?, description_en = ?, requirements_zh = ?, requirements_en = ?, salary = ?, is_active = ? WHERE id = ?`,
      [title_zh, title_en, department_zh, department_en, location_zh, location_en, description_zh, description_en, requirements_zh, requirements_en, salary, is_active !== undefined ? is_active : 1, req.params.id]
    );
    res.json({ message: '更新成功' });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    await runQuery('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

// --- Users ---
exports.getUsers = async (req, res) => {
  try {
    const users = await getQuery('SELECT id, username, role, created_at FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.translate = async (req, res) => {
  const { text, to = 'en' } = req.body;
  if (!text) return res.status(400).json({ message: '文本内容是必需的' });
  
  try {
    const translated = await translateText(text, to);
    res.json({ translated });
  } catch (err) {
    res.status(500).json({ message: '翻译失败', error: err.message });
  }
};

const bcrypt = require('bcryptjs');

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;
  const requesterId = req.userId;
  const requesterRole = req.userRole;

  try {
    // Get target user
    const targetUsers = await getQuery('SELECT id, username, role FROM users WHERE id = ?', [id]);
    if (targetUsers.length === 0) return res.status(404).json({ message: '用户不存在' });
    const targetUser = targetUsers[0];

    // Get requester username
    const requesters = await getQuery('SELECT username FROM users WHERE id = ?', [requesterId]);
    const requesterUsername = requesters[0].username;

    // Permission Check:
    // 1. Super Admin (username 'admin') can edit anyone.
    // 2. Regular Admin can edit ordinary users and themselves.
    // 3. Ordinary Users can only edit themselves.
    const isSuperAdmin = requesterUsername === 'admin';
    const isTargetSelf = parseInt(id) === requesterId;

    let canEdit = isSuperAdmin || isTargetSelf;
    if (!canEdit && requesterRole === 'admin' && targetUser.role === 'user') {
      canEdit = true;
    }

    if (!canEdit) {
      return res.status(403).json({ message: '权限不足，无法修改此账号' });
    }

    // Prepare update
    let query = 'UPDATE users SET username = ?';
    let params = [username || targetUser.username];

    // Only admins can change roles
    if (requesterRole === 'admin' && role && targetUser.username !== 'admin') {
      query += ', role = ?';
      params.push(role);
    }

    if (password) {
      query += ', password = ?';
      params.push(bcrypt.hashSync(password, 10));
    }

    query += ' WHERE id = ?';
    params.push(id);

    await runQuery(query, params);
    res.json({ message: '用户更新成功' });
  } catch (err) {
    res.status(500).json({ message: '更新失败', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const requesterId = req.userId;
  const requesterRole = req.userRole;

  try {
    if (parseInt(id) === requesterId) {
      return res.status(400).json({ message: '不能删除自己' });
    }

    // Get target user
    const targetUsers = await getQuery('SELECT id, username, role FROM users WHERE id = ?', [id]);
    if (targetUsers.length === 0) return res.status(404).json({ message: '用户不存在' });
    const targetUser = targetUsers[0];

    // Super Admin check
    const requesters = await getQuery('SELECT username FROM users WHERE id = ?', [requesterId]);
    const requesterUsername = requesters[0].username;
    const isSuperAdmin = requesterUsername === 'admin';

    // Target is Super Admin?
    if (targetUser.username === 'admin') {
      return res.status(403).json({ message: '初始超级管理员无法被删除' });
    }

    // Permission Check:
    // Super admin can delete anyone.
    // Regular admin can delete ordinary users.
    let canDelete = isSuperAdmin;
    if (!canDelete && requesterRole === 'admin' && targetUser.role === 'user') {
      canDelete = true;
    }

    if (!canDelete) {
      return res.status(403).json({ message: '权限不足，无法删除此账号' });
    }

    await runQuery('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: '用户已删除' });
  } catch (err) {
    res.status(500).json({ message: '删除失败', error: err.message });
  }
};

// --- Inquiries ---
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await getQuery('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    await runQuery('DELETE FROM inquiries WHERE id = ?', [req.params.id]);
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ message: '数据库错误', error: err.message });
  }
};
