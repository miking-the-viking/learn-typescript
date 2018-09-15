module.exports = {
  css: {
    sourceMap: true
  },
  pwa: {
    name: 'learn-typescript'
  },
  devServer: {
    proxy: 'http://localhost:' + process.env.NEST_HOST
  },
  // configureWebpack: {
  //   resolve: {
  //     // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
  //     extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql'],
  //   },
  //   module: {
  //     rules: [ // fixes https://github.com/graphql/graphql-js/issues/1272
  //       {
  //         test: /\.mjs$/,
  //         include: /node_modules/,
  //         type: 'javascript/auto',
  //       },
  //     ],
  //   }
  // },
  // pluginOptions: {
  //   apollo: {
  //     typescript: true,
  //   }
  // }
}