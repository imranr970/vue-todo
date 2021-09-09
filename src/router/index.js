import { createRouter, createWebHistory } from 'vue-router'
import useAuth from '@/composables/useAuth'
const { isLoggedIn } = useAuth()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../pages/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/login.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../pages/register.vue'),
    meta: {
      requiresAuth: false
    }
  },
  { 
    path: "/:catchAll(.*)",
    name: '404',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/pages/not-found'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !isLoggedIn()) next('login')
  else next() 
})

export default router
