/* eslint-disable @typescript-eslint/no-var-requires */

const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const buildFilesToCopy = require('./config/webpack/buildFilesToCopy');

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

    globalContentScripts: {
      entry: 'src/apps/contentScripts/global/global.runner.js',
      chunks: ['chunk-vendors', 'chunk-common', 'globalContentScripts'],
    },

    lobbyContentScripts: {
      entry: 'src/apps/contentScripts/lobby/lobby.runner.js',
      chunks: ['chunk-vendors', 'chunk-common', 'lobbyContentScripts'],
    },

    teamContentScripts: {
      entry: 'src/apps/contentScripts/team/team.runner.js',
      chunks: ['chunk-vendors', 'teamContentScripts'],
    },
  },
  chainWebpack: (config) => {
    config.plugin('writeFile')
      .use(WriteFilePlugin)

    // config.plugin('extensionLoader')
    //   .use(ChromeExtensionReloader)
  },
};

if(process.env.NODE_ENV === 'development'){
  config.pages.devPreMatch = {
    title: 'devPreMatch',
    entry: 'src/apps/server/apps/content/preMatch.js',
    chunks: ['chunk-vendors', 'chunk-common'],
    template: 'src/development/mocks/pre-match.html',
  }

  config.pages.devPicksAndBans = {
    title: 'devPicksAndBans',
    entry: 'src/apps/server/apps/content/picksAndBans.js',
    chunks: ['chunk-vendors', 'chunk-common'],
    template: 'src/development/mocks/picks-and-bans.mock.html',
  }
}

module.exports = config;