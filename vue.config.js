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
    appleMobileWebAppCapable: 'yes',
    workboxOptions: {
      exclude: [
        /_redirects$/
      ]
    }
  }
}
