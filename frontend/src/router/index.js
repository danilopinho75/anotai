import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/Home.vue';
import ProdutoPage from '../pages/Produto.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      'path': '/',
      'name': 'Início',
      'component': HomePage,
    },
    {
      'path': '/produto',
      'name': 'Produto',
      'component': ProdutoPage,
    }
  ],
})

export default router
