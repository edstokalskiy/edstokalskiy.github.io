import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/master',
    name: 'Master',
    component: () => import(/* webpackChunkName: "master" */ '../views/Master'),
    beforeEnter: (to, from, next) => {
      return !store.getters.getRole && next({ name: 'Home' }) || next();
    }
  },
  {
    path: '/advertiser',
    name: 'Advertiser',
    component: () => import(/* webpackChunkName: "master" */ '../views/Advertiser'),
    beforeEnter: (to, from, next) => {
      return !store.getters.getRole && next({ name: 'Home' }) || next();
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
