require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT|| 3002;

app.get('/', (req, res) => {
  res.send('P Balap!');
});

app.listen(port, () => console.log(`Listening Server on Port ${port}`))