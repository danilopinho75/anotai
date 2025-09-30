require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello guys!');
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro Interno do Servidor!' });
});

module.exports = app;