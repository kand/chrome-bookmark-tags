
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
      loader: 'babel',
      query: {
        plugins: [
          'syntax-jsx',
          'transform-react-jsx'
        ],
        presets: [
          'latest',
          'react',
          'stage-3'
        ]
      }
    }]
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    root: [
      path.resolve('./src')
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new HtmlWebpackPlugin({
      title: 'Bookmarks'
    })
  ]
}];

