import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/signin',
    name: 'SigninView',
    component: () => import('../views/SigninView.vue')
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/lists',
    name: 'RestaurantList',
    component: () => import('../views/RestaurantList.vue')
  },
  {
    path: '/groups',
    name: 'GroupList',
    component: () => import('../views/GroupList.vue')
  },
  {
    path: '/groups/:id',
    name: 'GroupDetails',
    props: true,
    component: () => import('../views/GroupList.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
