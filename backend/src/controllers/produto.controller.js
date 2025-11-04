const produtoService = require('../services/produto.service');

async function listarTodosProdutos(req, res) {
  try {
    const produtos = await produtoService.listarProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarProdutoEspecifico(req, res) {
  const { id } = req.params;
  try {
    const produto = await produtoService.buscarProdutoUnico(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function adicionarNovoProduto(req, res) {
  try {
    const produto = req.body;
    const novoProduto = await produtoService.adicionarProduto(produto);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function atualizarProduto(req, res) {
  try {
    const { id } = req.params;
    const produto = req.body;
    const produtoAtualizado = await produtoService.atualizarProduto(id, produto);
    if (!produtoAtualizado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function removerProduto(req, res) {
  try {
    const { id } = req.params;
    await produtoService.removerProduto(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarTodosProdutos,
  buscarProdutoEspecifico,
  adicionarNovoProduto,
  atualizarProduto,
  removerProduto
}