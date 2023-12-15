import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpFormView from '@/components/SignUpForm.vue'
import SignInFormView from '@/components/SignInForm.vue'
import { authGuard } from '@/guards/authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { authRequired: true }
    },
    {
      path: '/signin',
      name: 'signin',
      meta: { authRequired: false },
      component: SignInFormView
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { authRequired: false },
      component: SignUpFormView
    }
  ]
})

router.beforeEach(authGuard)

export default router
