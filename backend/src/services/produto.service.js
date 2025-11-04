const client = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Buscar todos os pedidos
async function listarProdutos(req, res) {
  const sql = `
    SELECT
      id,
      nome,
      categoria,
      preco
    FROM produtos;
    `;
  const [rows] = await client.query(sql);
  return rows;
}

async function buscarProdutoUnico(id) {
  const sql = `
    SELECT
      id,
      nome,
      categoria,
      preco
    FROM produtos
    WHERE id = ?;
  `;
  const [rows] = await client.query(sql, [id]);
  return rows[0];
}

async function adicionarProduto(produto) {
  const id = uuidv4();
  const categoriasPermitidas = ['Refeição', 'Bebida'];

  if(!produto.nome || produto.nome.trim() === '') {
    throw new Error('O nome do produto é obrigatório.');
  }

  if(!produto.categoria || produto.categoria.trim() === '') {
    throw new Error('A categoria do produto é obrigatória.');
  }

  if(!produto.preco || isNaN(produto.preco) || produto.preco < 0) {
    throw new Error('O preço do produto deve ser um número positivo.');
  }

  if(!categoriasPermitidas.includes(produto.categoria)) {
    throw new Error('Categoria inválida. As categorias permitidas são: refeicao, bebida.');
  }

  const sql = `
    INSERT INTO produtos (id, nome, categoria, preco)
    VALUES (?, ?, ?, ?);
  `;
  await client.query(sql, [id, produto.nome, produto.categoria, produto.preco]);
  return { id, ...produto };
}

async function atualizarProduto(id, produto) {
  const sql = `UPDATE produtos SET nome = ?, categoria = ?, preco = ? WHERE id = ?;`;
  await client.query(sql, [produto.nome, produto.categoria, produto.preco, id]);
  return { id, ...produto };
}

async function removerProduto(id) {
  const sql = `DELETE FROM produtos WHERE id = ?;`;
  await client.query(sql, [id]);
}

// Buscar pedido por ID
module.exports = {
  listarProdutos,
  buscarProdutoUnico,
  adicionarProduto,
  atualizarProduto,
  removerProduto
}