import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Filter from '../views/Filter.vue'
import ActivityDetails from '../views/ActivityDetails.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/categoria/:type',
    name: 'type-filter',
    component: Filter
  }, {
    path: '/categoria/:type/subcategoria/:subtype',
    name: 'subtype-filter',
    component: Filter
  }, {
    path: '/acao/:id',
    name: 'activity-details',
    component: ActivityDetails
  }, {
    path: '/sobre',
    name: 'about',
    component: About
  }, {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, saved) => saved || { x: 0, y: 0 }
})

export default router
