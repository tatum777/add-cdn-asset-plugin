const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const cdnConfig = require("./src/cdnConfig");
const AddCdnAssetPlugin = require("./index.js");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new AddCdnAssetPlugin(cdnConfig)
  ]
};
