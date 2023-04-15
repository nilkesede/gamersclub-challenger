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

    liveMatchContentScripts: {
      entry: 'src/apps/contentScripts/liveMatch/liveMatch.runner.js',
      chunks: ['chunk-vendors', 'chunk-common', 'liveMatchContentScripts'],
    },

    matchContentScripts: {
      entry: 'src/apps/contentScripts/match/match.runner.js',
      chunks: ['chunk-vendors', 'chunk-common', 'matchContentScripts'],
    },

    playerContentScripts: {
      entry: 'src/apps/contentScripts/player/player.runner.js',
      chunks: ['chunk-vendors', 'chunk-common', 'playerContentScripts'],
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
  const serverBasePath = 'src/apps/server';
  config.pages.devPreMatch = {
    title: 'devPreMatch',
    entry: `${serverBasePath}/apps/contentScripts/preMatch.runner.js`,
    chunks: ['chunk-vendors', 'chunk-common'],
    template: `${serverBasePath}/mocks/pre-match.mock.html`,
  }

  config.pages.devLiveMatch = {
    title: 'liveMatch',
    entry: `${serverBasePath}/apps/contentScripts/liveMatch.runner.js`,
    chunks: ['chunk-vendors', 'chunk-common'],
    template: `${serverBasePath}/mocks/pre-match.mock.html`,
  }

  config.pages.devPicksAndBans = {
    title: 'devPicksAndBans',
    entry: `${serverBasePath}/apps/contentScripts/picksAndBans.runner.js`,
    chunks: ['chunk-vendors', 'chunk-common'],
    template: `${serverBasePath}/mocks/picks-and-bans.mock.html`,
  }
}

module.exports = config;