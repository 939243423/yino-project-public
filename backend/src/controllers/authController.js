const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ message: '数据库错误', error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: '账号密码不匹配' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: '账号密码不匹配' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).json({
      id: user.id,
      username: user.username,
      role: user.role,
      accessToken: token
    });
  });
};

exports.register = (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '用户名和密码是必需的' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userRole = role || 'user';

  db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, userRole], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ message: '用户名已存在' });
      }
      return res.status(500).json({ message: '数据库错误', error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'User registered successfully' });
  });
};

exports.verifyToken = (req, res) => {
  // If it gets here, the middleware has already verified it
  res.status(200).json({ valid: true });
};
