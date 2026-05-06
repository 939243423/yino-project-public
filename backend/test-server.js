const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => res.send('OK'));

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});

// Prevent exit
setInterval(() => {
  console.log('Pulse...');
}, 5000);
