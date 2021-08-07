## 安装

```bash
  npm i --save-dev add-cdn-asset-plugin
```

## 使用

基于 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 动态插入 cdn 数据到 html 模板

**cdnConfig.js**

```js
module.exports = {
  bootstrapCss:
    "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css",
  vue: "https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js"
};
```

**webpack.config.js**

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const cdnConfig = require("./src/cdnConfig");
const AddCdnAssetPlugin = require("add-cdn-asset-plugin");

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
```
