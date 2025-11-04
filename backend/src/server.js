const app = require('./app');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
})