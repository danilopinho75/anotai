const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produto.controller');

router.get('/', produtoController.listarTodosProdutos);
router.get('/:id', produtoController.buscarProdutoEspecifico);
router.post('/', produtoController.adicionarNovoProduto);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.removerProduto);

module.exports = router;