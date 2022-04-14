const express = require('express');
const path = require('path');
const { SERVER_PORT } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.end('Hello world!!');
});

app.post('/sign-up', (req, res) => {
  res.json({
    ok: true,
  })
})


app.listen(SERVER_PORT || 8000);