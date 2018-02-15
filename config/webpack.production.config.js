'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '../app')
  ],
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../app/index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    }), new HtmlWebpackPlugin({
      template: path.join(__dirname, '../app/admin.tpl.html'),
      inject: 'body',
      filename: 'admin.html',
      hash: true
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".ts", ".css"],
    root: path.resolve('../app'),
    'alias': {
      'presentational': path.join(__dirname, '../app/components/presentational'),
      'reduxImplementations': path.join(__dirname, '../app/reduxImplementations'),
      'utils': path.join(__dirname, '../app/utils'),
      'services': path.join(__dirname, '../app/reduxImplementations/services'),
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["es2015", "stage-0", "react"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
    }, {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};
