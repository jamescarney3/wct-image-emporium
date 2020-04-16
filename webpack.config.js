const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const globImporter = require('node-sass-glob-importer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = () => {
  const dotfileEnv = dotenv.config().parsed || {};
  const combinedEnv = { ...process.env, ...dotfileEnv };

  const envKeys = Object.entries(combinedEnv).reduce((acc, [k, v]) => (
    { ...acc, [`process.env.${k}`]: JSON.stringify(v) }
  ), {});

  return {
    entry: './client/src/index.ts',
    mode: combinedEnv.NODE_ENV || 'development',
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
      path: path.resolve(__dirname, 'client/dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'client/dist'),
      port: combinedEnv.DEV_SERVER_PORT || 13666,
      publicPath: '/',
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true,
      proxy: {
        '/auth': `http://localhost:${combinedEnv.RAILS_DEFAULT_PORT || 42069}`,
        '/api': `http://localhost:${combinedEnv.RAILS_DEFAULT_PORT || 42069}`,
        '/rails': `http://localhost:${combinedEnv.RAILS_DEFAULT_PORT || 42069}`,
      },
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'client/src/index.html'),
        inject: false,
      }),
    ],
  };
};
