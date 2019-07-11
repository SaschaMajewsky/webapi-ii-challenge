const express = require('express');

const postsRouter = require('./data/posts-router.js');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2> Posts API</h2>
    <p>Welcome to the Posts API! :-)</p>`);
});

server.use('/api/posts', postsRouter);

let port = 7000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
