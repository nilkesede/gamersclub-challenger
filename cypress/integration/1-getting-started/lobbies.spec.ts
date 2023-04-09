import { first } from 'cypress/types/lodash'
import { gcPages, gcSiteUrl } from '../../../src/shared/gc/api/resources/urls'

describe('lobbies', () => {
  beforeEach(() => {
    cy.visit(gcPages.lobby)
  })
  describe("there're lobbies with players", () => {
    it("shows player's KDR", () => {
      expect(cy.get('.gcc-kdr')).to.be.visible()
    })
  })
})
