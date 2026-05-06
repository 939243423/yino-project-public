const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, '../data/yino.db');

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.log('Usage: node createAdmin.js <username> <password>');
  process.exit(1);
}

const [username, password] = args;

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
});

const hash = bcrypt.hashSync(password, 10);

db.run(
  'INSERT INTO users (username, password) VALUES (?, ?)',
  [username, hash],
  function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        console.error(`Error: User '${username}' already exists.`);
      } else {
        console.error('Error creating user:', err.message);
      }
    } else {
      console.log(`Success! Admin user '${username}' has been created with ID: ${this.lastID}`);
    }
    db.close();
  }
);
