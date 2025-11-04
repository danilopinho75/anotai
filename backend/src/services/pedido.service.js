const client = require('../config/db');

// Buscar todos os pedidos
async function buscarTodosPedidos(req, res) {
  const sql = `
    SELECT 
      p.id AS pedido_id,
      p.cliente_id,
      p.data,
      pi.id AS item_id,
      pr.nome AS produto_nome,
      pi.quantidade,
      pr.preco AS valor_unitario,
      (pi.quantidade * pr.preco) AS subtotal
    FROM pedidos p
    JOIN pedido_itens pi ON p.id = pi.pedido_id
    JOIN produtos pr ON pi.produto_id = pr.id
    ORDER BY p.data DESC;
    `;
  const [rows] = await client.query(sql);
}

async function buscarPedido(id) {
  const sql = `
    SELECT
      p.id AS pedido_id,
      p.cliente_id,
      p.data,
      pi.id AS item_id,
      pr.nome AS produto_nome,
      pi.quantidade,
      pr.preco AS valor_unitario,
      (pi.quantidade * pr.preco) AS subtotal
    FROM pedidos p
    JOIN pedido_itens pi ON p.id = pi.pedido_id
    JOIN produtos pr ON pi.produto_id = pr.id
    WHERE p.id = ?;
  `;
}

// Buscar pedido por ID
module.exports = {
  buscarTodosPedidos,
}