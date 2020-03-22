const contextedRequire = require.context('.', false, /.store.js$/)

const modules = {}
contextedRequire.keys().forEach(filename => {
  // Removes the "./" and the ".store.js" of the filename
  const moduleName = filename.replace(/(^\.\/)|(.store.js$)/g, '')
  modules[moduleName] = contextedRequire(filename).default
})

export default modules
