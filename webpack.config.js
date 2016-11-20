
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
  entry: {
    app: './' + path.join('src', 'app'),
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'client.js'
  },
  module: {
    preLoaders: [{
      test: /\.jsx$/,
      loader: 'babel',
      query: {
        plugins: [
          'syntax-jsx',
          'transform-react-jsx'
        ],
        presets: [
          'latest',
          'react'
        ]
      }
    }],
    loaders: [{
      test: /\.jsx$/,
      loader: 'jsx'
    }]
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    modulesDirectory: ['node_modules']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new HtmlWebpackPlugin({
      title: 'Bookmarks'
    })
  ]
}];

