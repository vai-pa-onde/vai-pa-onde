import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import ActivityDetails from '../views/ActivityDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/activity/:id',
    name: 'activity-details',
    component: ActivityDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
