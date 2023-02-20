/* eslint-disable @typescript-eslint/no-var-requires */

const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const buildFilesToCopy = require('./webpack/buildFilesToCopy');

const config = {
  configureWebpack: {
    devtool: 'cheap-module-source-map',
    plugins: [
      new CopyWebpackPlugin({
        patterns: buildFilesToCopy()
      }),
    ]
  },

  filenameHashing: false,

  pages: {
    popup: {
      entry: 'src/apps/popup/index.ts',
      template: 'src/apps/popup/popup.html',
      chunks: ['chunk-vendors', 'chunk-common', 'popup']
    },

    lobbyContentScripts: {
      entry: 'src/apps/content/lobby.js',
      chunks: ['chunk-vendors', 'chunk-common', 'lobbyContentScripts'],
    },

    teamContentScripts: {
      entry: 'src/apps/content/team.js',
      chunks: ['chunk-vendors', 'teamContentScripts'],
    },

    devPreMatch: {
      entry: 'src/development/apps/content/preMatch.js',
      chunks: ['chunk-vendors', 'chunk-common', 'devPreMatch'],
      subpage: 'src/development/mocks/pre-match.html',
    }

  },
  chainWebpack: (config) => {
    config.plugin('writeFile')
      .use(WriteFilePlugin)

    // config.plugin('extensionLoader')
    //   .use(ChromeExtensionReloader)
  },
};

module.exports = config;