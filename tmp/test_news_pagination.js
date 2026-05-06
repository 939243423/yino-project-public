const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', (err) => reject(err));
  });
}

async function testPagination() {
  const categories = ['news', 'insight'];
  
  for (const category of categories) {
    console.log(`Testing category: ${category}`);
    try {
      const response = await get(`http://localhost:3000/api/public/news?category=${category}&page=1&limit=2`);
      
      console.log('Response Metadata:', JSON.stringify(response.pagination, null, 2));
      console.log('Items Count:', response.data.length);
      
      if (response.data.length > 0) {
        console.log('Sample Item Category:', response.data[0].category);
      }
      
      console.log('---');
    } catch (error) {
      console.error(`Error testing ${category}:`, error.message);
    }
  }
}

testPagination();
