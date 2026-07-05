import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/index.vue'),
      redirect: '/bookshelf',
      children: [
        {
          path: 'bookshelf',
          name: 'bookshelf',
          component: () => import('@/views/BookShelf/index.vue')
        },
        {
          path: 'explore',
          name: 'explore',
          component: () => import('@/views/Explore/index.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/Profile/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path:'/read/:bookId',
      name:'read',
      component:()=>import('@/views/BookShelf/Components/BookRead.vue'),
      props:true
    },
  ]
})

export default router
