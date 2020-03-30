import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Filter from '../views/Filter.vue'
import ActivityDetails from '../views/ActivityDetails.vue'
import About from '../views/About.vue'

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
    path: '/ação/:id',
    name: 'activity-details',
    component: ActivityDetails
  }, {
    path: '/sobre',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
