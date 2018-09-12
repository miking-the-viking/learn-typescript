module.exports = {
  css: {
    sourceMap: true
  },
  pwa: {
    name: 'learn-typescript'
  },
  devServer: {
    proxy: 'http://localhost:' + process.env.NEST_HOST
  }
}