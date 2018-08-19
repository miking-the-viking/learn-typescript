/**
 * Webpack Configuration for TypeScript Demo Node Application
 */


require('dotenv').config();

const webpack = require('webpack');                                                 //  Webpack is required for webpack... :O
const path = require('path');                                                       //  Path provides utilities for working with file and directory paths
const MiniCssExtractPlugin = require("mini-css-extract-plugin");                    //  Used to extract and minify CSS built for webpack v4
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");                          //  Used to minify production javascript
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");      //  Optimizes files by reducing duplicated CSS rules

const devMode = process.env.NODE_ENV !== 'production'                               // Set the development mode boolean as a constant

/**
 * Configuration for the `node/` TypeScript Demo Application
 */
const tsDemoConfig = {
    entry: ['./src/main.ts'],
    watch: true,
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    mode: 'development',
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true
            }
          }
        }
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: devMode ? '[name].css' : '[name].[hash].css',
          chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
      ],
      output: {
        path: path.join(__dirname, 'dist/typescriptDemoApp/js'),
        filename: 'client.js',
      }
};

module.exports = [tsDemoConfig]