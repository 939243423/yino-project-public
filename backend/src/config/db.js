const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../../data/yino.db');

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration: Add role column if it doesn't exist (for existing databases)
  db.run("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'", (err) => {
    // Ignore error if column already exists
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS banners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image_url TEXT NOT NULL,
      link TEXT,
      category TEXT DEFAULT 'home',
      sort_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration: Add category column if it doesn't exist
  db.run("ALTER TABLE banners ADD COLUMN category TEXT DEFAULT 'home'", (err) => {});
  db.run("ALTER TABLE banners ADD COLUMN title_zh TEXT", (err) => {});
  db.run("ALTER TABLE banners ADD COLUMN title_en TEXT", (err) => {});
  db.run("ALTER TABLE banners ADD COLUMN description_zh TEXT", (err) => {});
  db.run("ALTER TABLE banners ADD COLUMN description_en TEXT", (err) => {});
  
  // Data Migration: Copy old title to title_zh for existing banners
  db.run("UPDATE banners SET title_zh = title WHERE (title_zh IS NULL OR title_zh = '') AND (title IS NOT NULL AND title != '')", (err) => {
    if (err) console.error("Banner title migration failed:", err.message);
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_zh TEXT NOT NULL,
      title_en TEXT NOT NULL,
      description_zh TEXT,
      description_en TEXT,
      content_zh TEXT,
      content_en TEXT,
      cover_url TEXT,
      views INTEGER DEFAULT 0,
      is_published BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration for news table
  db.run("ALTER TABLE news ADD COLUMN description_zh TEXT", (err) => {});
  db.run("ALTER TABLE news ADD COLUMN description_en TEXT", (err) => {});
  db.run("ALTER TABLE news ADD COLUMN category TEXT DEFAULT 'news'", (err) => {});

  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_zh TEXT NOT NULL,
      title_en TEXT NOT NULL,
      department_zh TEXT,
      department_en TEXT,
      location_zh TEXT,
      location_en TEXT,
      description_zh TEXT,
      description_en TEXT,
      requirements_zh TEXT,
      requirements_en TEXT,
      salary TEXT,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration for jobs table
  db.run("ALTER TABLE jobs ADD COLUMN salary TEXT", (err) => {});

  db.run(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Force admin user to have correctly set role
  const bcrypt = require('bcryptjs');
  db.get('SELECT id, role FROM users WHERE username = ?', ['admin'], (err, row) => {
    if (err) {
      // If we still hit a race where role doesn't exist yet, we'll try again without role
      db.get('SELECT id FROM users WHERE username = ?', ['admin'], (err2, row2) => {
        if (!row2) {
          const hash = bcrypt.hashSync('admin123', 10);
          db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', hash, 'admin']);
        }
      });
      return;
    }
    
    if (!row) {
      const hash = bcrypt.hashSync('admin123', 10);
      db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', hash, 'admin']);
    } else if (row.role !== 'admin') {
      db.run('UPDATE users SET role = ? WHERE username = ?', ['admin', 'admin']);
    }
  });
});

module.exports = db;
