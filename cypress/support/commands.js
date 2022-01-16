// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { gcPages, gcSiteUrl } from '../../src/utils/gcUrls'
import {gcSelectors} from '../../src/utils/gcSelectors'

const addExtensionCommands = require('cypress-browser-extension-plugin/commands');
addExtensionCommands(Cypress);

Cypress.Commands.add('login', (username, password) => {
  cy.session(
    [username, password],
    () => {
        cy.visit(gcPages.login)
        cy.get(gcSelectors.login.steamButton).click()

        cy.location('href', {timeout: 10000})
          .should('include', '/openid/login')

        cy.get(gcSelectors.steamLoginPage.usernameInput).type(username)
        cy.get(gcSelectors.steamLoginPage.passInput).type(password)
        cy.get(gcSelectors.steamLoginPage.loginForm).submit()
        cy.wait(3000)

    },
    {
      validate() {
        return typeof window.localStorage.getItem('gc:authToken') === 'string'
      },
    }
  )
})