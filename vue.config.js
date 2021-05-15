/* eslint-disable @typescript-eslint/no-var-requires */

const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')

module.exports = {
  configureWebpack: {
    devtool: 'cheap-module-source-map',
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'manifest.json'
          },
          {
            from: 'src/_locales',
            to: '_locales'
          },
          {
            from: 'src/assets',
            to: 'assets'
          }
        ]
      }),
    ],
  },

  pages: {
    // popup: {
    //   entry: 'apps/popup.js',
    // },

    contentScripts: {
      entry: 'src/apps/content/index.js',
      chunks: [],
    },
  },
  chainWebpack: (config) => {
    config.plugin('writeFile')
      .use(WriteFilePlugin)

    // config.plugin('extensionLoader')
    //   .use(ChromeExtensionReloader)
  },
};
