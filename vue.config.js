const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/stylesheets/application.scss";`
      },
    },
  },
/*  devServer: {
    proxy: {
      '/maps-api': {
        target: 'https://maps.googleapis.com',
        changeOrigin: true,
        pathRewrite: {
          '^/maps-api': '',
        },
      },
    },
  }, */
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0]['process.env'].VUE_APP_GOOGLE_MAPS_API_KEY = JSON.stringify(process.env.VUE_APP_GOOGLE_MAPS_API_KEY);
      return args;
    });
  },
})
