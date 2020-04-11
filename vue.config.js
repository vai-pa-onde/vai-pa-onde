module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/core/_settings.scss";
          @import "@/styles/core/_tools.scss";
        `
      }
    }
  },
  pwa: {
    workboxOptions: {
      appleMobileWebAppCapable: 'yes',
      exclude: [
        /_redirects$/
      ]
    }
  }
}
