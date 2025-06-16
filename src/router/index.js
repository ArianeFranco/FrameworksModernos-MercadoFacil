import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Dashboard from '../views/Dashboard.vue'
import Produtos from '../views/Produtos.vue'
import Vendas from '../views/Vendas.vue'
import Perfil from '../views/Perfil.vue'
import { auth } from '../firebase'

const routes = [
  { path: '/', component: Login },
  { path: '/cadastro', component: Cadastro },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/produtos',
    component: Produtos,
    meta: { requiresAuth: true }
  },
  {
    path: '/vendas',
    component: Vendas,
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    component: Perfil,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protege as rotas privadas
router.beforeEach((to, from, next) => {
  const user = auth.currentUser
  if (to.meta.requiresAuth && !user) {
    next('/')
  } else {
    next()
  }
})

export default router
