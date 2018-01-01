const webpack = require("webpack")
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DEBUG = process.env.NODE_ENV === 'development'

module.exports = [
    // client js build
    {
      context: path.join(__dirname, 'src/ts/'),
      entry: {
        'app': './app.ts'
      },
      output: {
        path: path.join(__dirname, 'js'),
        filename: './[name].bundle.js'
      },
      devtool: DEBUG ? 'source-map' : false,
      resolve: {
        extensions: ['*', '.js', '.ts', '.json']
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules|vue\/src/,
            loader: 'ts-loader'
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: ['file-loader?name=[path][name].[ext]']
          }
        ]
      },
      plugins: []
    },
    // SCSS build
    {
      context: path.join(__dirname, '/src/scss'),
      entry: {
        'app': './app.scss'
      },
      output: {
        path: path.join(__dirname, '/css/'),
        filename: '[name].bundle.css'
      },
      devtool: DEBUG ? 'source-map' : false,
      module: {
        rules: [
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: ['file-loader?name=[path][name].[ext]']
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: ['url-loader?mimetype=image/svg+xml']
          },
          {
            test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/,
            use: ['url-loader?mimetype=application/font-woff']
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: ['url-loader?mimetype=application/font-woff']
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: ['url-loader?mimetype=application/font-woff']
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] })
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] })
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin('[name].bundle.css')
      ]
    }
  ]