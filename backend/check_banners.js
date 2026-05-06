const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'data/yino.db');
const db = new sqlite3.Database(dbPath);

console.log('ID | Title | Active | Category | URL');
console.log('---|-------|--------|----------|----');
db.all('SELECT id, title, is_active, category, image_url FROM banners', [], (err, rows) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  rows.forEach(row => {
    console.log(`${row.id} | ${row.title} | ${row.is_active} | ${row.category} | ${row.image_url}`);
  });
  db.close();
});
