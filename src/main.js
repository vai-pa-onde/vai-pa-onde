import Vue from 'vue'
import VueMeta from 'vue-meta'
import Toasted from 'vue-toasted'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components'
import './registerServiceWorker'

Vue.use(components)
Vue.use(VueMeta)
Vue.use(Toasted, {
  duration: 5000,
  position: 'bottom-left'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
