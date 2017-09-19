
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
  devtool: 'inline-source-map',
  entry: {
    app: './' + path.join('src', 'app'),
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'client.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        plugins: [
          'syntax-jsx',
          'transform-react-jsx',
          'transform-object-rest-spread',
          'transform-class-properties'
        ],
        presets: [
          'env',
          'react'
        ]
      }
    }]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    new HtmlWebpackPlugin({
      title: 'Bookmarks'
    })
  ]
}];

