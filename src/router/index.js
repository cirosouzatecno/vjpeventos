import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/HomePage.vue') },
  { path: '/projetos', component: () => import('@/pages/ProjetosPage.vue') },
  { path: '/corporativo', component: () => import('@/pages/CorporativoPage.vue') },
  { path: '/festas', component: () => import('@/pages/Festas2Page.vue') },
  { path: '/batizado', component: () => import('@/pages/BatizadoPage.vue') },
  { path: '/15-anos', component: () => import('@/pages/Page15AnosPage.vue') },
  { path: '/casamento', component: () => import('@/pages/CasamentoPage.vue') },
  { path: '/cerimonia', component: () => import('@/pages/CerimoniaPage.vue') },
  { path: '/aniversario', component: () => import('@/pages/AniversarioPage.vue') },
  { path: '/decoracao-residencial', component: () => import('@/pages/DecoracaoResidencialPage.vue') },
  { path: '/sobre-nos', component: () => import('@/pages/SobreNosPage.vue') },
  { path: '/especial-natal', component: () => import('@/pages/EspecialNatalPage.vue') },
  { path: '/admin', component: () => import('@/pages/AdminPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
