/* eslint-disable @typescript-eslint/no-var-requires */

const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
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
          },
          {
            from: 'background.js'
          },
          {
            from: 'src/apps/serviceWorkerResources',
            to: 'serviceWorkerResources'
          }
        ]
      }),
    ]
  },

  filenameHashing: false,

  pages: {
    popup: {
      entry: 'src/apps/popup/index.ts',
      template: 'src/apps/popup/popup.html',
      chunks: ['chunk-vendors', 'popup']
    },

    lobbyContentScripts: {
      entry: 'src/apps/content/lobby.js',
      chunks: ['chunk-vendors', 'lobbyContentScripts'],
    },

  },
  chainWebpack: (config) => {
    config.plugin('writeFile')
      .use(WriteFilePlugin)

    // config.plugin('extensionLoader')
    //   .use(ChromeExtensionReloader)
  },
};

module.exports = config;