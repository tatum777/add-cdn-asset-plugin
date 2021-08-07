const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const PLUGINNAME = "AddCdnAssetPlugin";

function getContent(cdnPath, scriptContent, styleContent) {
  let ext = path.extname(cdnPath);
  if (ext === ".js") {
    scriptContent.push(
      `<script crossorigin type="text/javascript" src=${cdnPath}></script>`
    );
  } else if (ext === ".css") {
    styleContent.push(`<link href=${cdnPath} rel="stylesheet">`);
  }
}

class AddCdnAssetPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGINNAME, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        PLUGINNAME,
        (data, cb) => {
          let cdnConfig = this.options,
            scriptContent = [],
            styleContent = [];
          Object.keys(cdnConfig).forEach(item => {
            getContent(cdnConfig[item], scriptContent, styleContent);
          });

          if (scriptContent.length) {
            scriptContent.push("</body>");
            data.html = data.html.replace(/<\/body>/, scriptContent.join(""));
          }

          if (styleContent.length) {
            styleContent.push("</head>");
            data.html = data.html.replace(/<\/head>/, styleContent.join(""));
          }

          cb(null, data);
        }
      );
    });
  }
}

module.exports = AddCdnAssetPlugin;
