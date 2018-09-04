// module.exports = {
//     configureWebpack: {
//         plugins: [
//             new MyAwesomeWebpackPlugin()
//         ]
//     }
// }
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
            console.log('is profuction');
        } else {
            // mutate for development...
            console.log('is not production');
        }
    }
}
