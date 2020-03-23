const contextedRequire = require.context('.', true, /^\.\/.*\.vue$/)

const components = {}
contextedRequire.keys().forEach(filename => {
  const component = contextedRequire(filename).default
  components[component.name] = component
})

export default {
  install(Vue) {
    Object.entries(components).forEach(entry => Vue.component(entry[0], entry[1]))
  }
}
