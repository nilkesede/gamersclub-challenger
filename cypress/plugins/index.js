/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const extensionLoader = require('cypress-browser-extension-plugin/loader');
const extensionDistPath = 'C:\\Users\\carlo\\Documents\\workspace\\personal\\matchmaking-gc\\dist'
module.exports = (on) => {
  on('before:browser:launch', (browser, settings) => {
    const fn = extensionLoader.load(extensionDistPath)
    fn(browser, settings.args)
  });
}