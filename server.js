const express = require('express');
const { SERVER_PORT } = process.env;
const app = express();


app.get('/', (req, res) => {
  res.end('Hello world!!');
})


app.listen(SERVER_PORT || 8000);