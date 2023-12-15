import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpFormView from '@/components/SignUpForm.vue'
import SignInFormView from '@/components/SignInForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SignInFormView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpFormView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'signin' && to.name !== 'signup') {
    fetch('/api/users/security', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then((response) => {
      if (response.status === 401) {
        next({ name: 'signin' })
      } else {
        next()
      }
    })
  }
  next()
  return false
})
export default router
