const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const sassLoader = require("sass-loader");

module.exports = {

  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue3",

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));

    return config;
  },
}