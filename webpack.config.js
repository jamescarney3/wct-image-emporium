const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const globImporter = require('node-sass-glob-importer');


dotenv.config();

module.exports = {
  entry: './client/src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            // eslint-disable-next-line global-require
            plugins: [require('precss'), require('autoprefixer')],
          },
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
          options: {
            importer: globImporter(),
          },
        }],
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'client/src/'),
      styles: path.resolve(__dirname, 'client/styles/'),
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'client/dist/'),
    publicPath: 'http://localhost:13666/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/dist/'),
    port: 13666,
    publicPath: 'http://localhost:13666/dist/',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
