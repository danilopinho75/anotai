<template>
  <main class="flex flex-col w-full h-full gap-8 p-6">
    <section class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold text-gray-900">Nossos Produtos</h1>
      <h2 class="text-xl font-semibold mt-5 text-green-700">Adicionar Novo Produto</h2>
      <div class="flex flex-row gap-5 items-end">
        <div class="flex flex-col w-full gap-2">
          <label class="text-sm font-semibold text-gray-700">Nome do Produto:</label>
          <input
          v-model="novoProduto.nome"
          type="text"
          placeholder="Digite o nome do produto"
          class="p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="flex flex-col w-full gap-2">
          <label class="text-sm font-semibold text-gray-700">Categoria do Produto:</label>
          <select v-model="novoProduto.categoria" name="categoriaProduto" id="categoriaProduto" class="p-2 border border-gray-300 rounded">
            <option value="Refeição">Refeição</option>
            <option value="Bebida">Bebida</option>
          </select>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label class="text-sm font-semibold text-gray-700">Preço:</label>
          <input
          v-model="novoProduto.preco"
          type="text"
          placeholder="Preço do produto"
          class="p-2 border border-gray-300 rounded"
          />
        </div>        
        <button @click="criarProduto" class="bg-green-400 rounded w-xl h-fit p-4 cursor-pointer text-black hover:bg-green-600 hover:text-green-50 transition duration-500">Adicionar Produto</button>
      </div>
    </section>
    <section class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold mt-5 text-gray-700">Produtos cadastrados</h2>
      <div v-if="produtos.length === 0 || produtos === null" class="w-full text-center">
        <span class="bg-red-100 px-5 py-3 rounded-lg text-red-500 font-semibold ">Não existe nenhum produto cadastrado.</span>
      </div>
      <table v-else class="table-auto w-full">
        <thead class="h-10 p-2">
          <tr class="font-semibold text-gray-700 border-b-2 border-b-gray-400">
            <td class="p-3">Nome do Produto</td>
            <td class="p-3">Categoria</td>
            <td class="p-3">Preço</td>
            <td class="p-3">Ações</td>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100 transition duration-500 border-b border-b-gray-200 text-gray-600" v-for="produto in produtos" :key="produto.id">
            <td class="p-3">{{produto.nome}}</td>
            <td class="p-3">{{produto.categoria}}</td>
            <td class="p-3">R$ {{produto.preco}}</td>
            <td class="p-3">
              <button 
                class="mr-3 p-3 bg-yellow-100 hover:bg-yellow-200 border border-transparent hover:border-yellow-300 rounded-xl transition duration-500"                
                @click="editarProduto(produto.id)"
              >
                <PencilSquareIcon class="w-6 h-6 text-yellow-500" />
              </button>
              <button 
                class="bg-red-100 rounded-xl p-3 border border-transparent cursor-pointer hover:bg-red-200 hover:border-red-300 transition duration-500"
                @click="excluirProduto(produto.id)"
              >
                <TrashIcon class="w-6 h-6 text-red-500" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';

  const produtos = ref([]);
  const novoProduto = ref({
    nome: '',
    categoria: 'Refeição',
    preco: 0
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  async function carregarProdutos() {
    try {
      console.log('API URL:', import.meta.env.VITE_API_URL);

      const response = await axios.get(`${apiUrl}/produtos`);
      produtos.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  async function criarProduto() {
    try {
      const response = await axios.post(`${apiUrl}/produtos`, novoProduto.value);
      produtos.value.push(response.data);

      // Limpar o formulário
      novoProduto.value = {
        nome: '',
        categoria: 'Refeição',
        preco: null
      }

      alert('Produto criado com sucesso!');

    } catch (error) {
      console.error('Erro ao criar produto:', error);
      alert('Erro ao criar produto. Por favor, tente novamente.', error.message);
    }
  }

  // async function editarProduto(id) {
  //   const produtoParaEditar = produtos.value.find(produto => produto.id === id);
  // }

  async function excluirProduto(id) {
    try {
      await axios.delete(`${apiUrl}/produtos/${id}`);
      produtos.value = produtos.value.filter(produto => produto.id !== id);
      alert('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto. Por favor, tente novamente.');
    }
  }

  onMounted(() => {
    carregarProdutos();
  })

</script>

<style scoped>

</style>