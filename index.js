require('dotenv').config()

const app = require('express')();
const port = process.env.PORT|| 3004;

app.get('/', (req, res) => {
  res.send('P Balap!');
});

app.listen(port, () => console.log(`Listening Server on Port ${port}`))