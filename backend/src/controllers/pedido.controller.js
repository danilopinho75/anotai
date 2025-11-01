const pedidoService = require('../services/pedido.service');

// Controlador para buscar todos os pedidos
async function getPedidos(req, res) {
  try {
    const pedidos = await pedidoService.getAll(req, res);
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPedidoById(req, res) {
  const id = req.params.id;
  
}