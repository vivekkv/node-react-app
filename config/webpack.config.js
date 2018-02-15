'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "source-map",
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '../app')
  ],
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../app/index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
      hash: true  
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../app/admin.tpl.html'),
      inject: 'body',
      filename: 'admin.html',
      hash: true  
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".ts", ".css"],
    root: path.join(__dirname, '../app'),
    'alias': {
      'presentational': path.join(__dirname, '../app/components/presentational'),
      'reduxImplementations': path.join(__dirname, '../app/reduxImplementations'),
      'utils': path.join(__dirname, '../app/utils'),
      'services': path.join(__dirname, '../app/reduxImplementations/services'),
      'constants': path.join(__dirname, '../app/reduxImplementations/constants'),
      'baseComponents' : path.join(__dirname, '../app/components/base'),
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules'
      ]
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  }
};
