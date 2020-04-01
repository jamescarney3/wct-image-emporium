const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: "./client/src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "client/dist/"),
    publicPath: "http://localhost:13666/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "client/dist/"),
    port: 13666,
    publicPath: "http://localhost:13666/dist/",
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
