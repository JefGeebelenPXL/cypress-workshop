/// <reference types="cypress" />
context('Performance - Lighthouse', () => {
  it('.lighthouse() - checks the performance characteristics', () => {
    cy.visit('https://example.cypress.io/commands/actions')
    return cy.lighthouse(
      Cypress.config('lighthouseThresholds'),
      Cypress.config('lighthouseDesktopOptions'),
      Cypress.config('lighthouseConfig')
    )
  })

  // https://on.cypress.io/interacting-with-elements
  it('.lighthouse() - checks multiple performance characteristics', () => {
    urls = cy
      .readFile('cypress/fixtures/urls.json')
      .its('URLs')
      .each((url) => {
        cy.visit(url)
        return cy.lighthouse(
          Cypress.config('lighthouseThresholds'),
          Cypress.config('lighthouseDesktopOptions'),
          Cypress.config('lighthouseConfig')
        )
      })
  })
})
