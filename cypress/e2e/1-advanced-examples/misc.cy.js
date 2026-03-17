/// <reference types="cypress" />

context('Misc', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/misc')
  })

  it('.end() - end the command chain', () => {
    // https://on.cypress.io/end

    // cy.end is useful when you want to end a chain of commands
    // and force Cypress to re-query from the root element
    cy.get('.misc-table').within(() => {
      // ends the current chain and yields null
      cy.contains('Cheryl').click().end()

      // queries the entire table again
      cy.contains('Charles').click()
    })
  })

  it('cy.exec() - execute a system command', () => {
    // execute a system command.
    // so you can take actions necessary for
    // your test outside the scope of Cypress.
    cy.exec('echo Jane Lane').its('stdout').should('contain', 'Jane Lane')

    // we can use Cypress.platform string to
    // select appropriate command
    cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`)

    if (Cypress.platform === 'win32') {
      cy.exec('print cypress.config.js').its('stderr').should('be.empty')
    } else {
      cy.exec('cat cypress.config.js').its('stderr').should('be.empty')

      cy.exec('pwd')
        // for Cypress 14 and below, use 'code' instead of 'exitCode'
        .its('exitCode')
        .should('eq', 0)
    }
  })

  it('cy.focused() - get the DOM element that has focus', () => {
    // https://on.cypress.io/focused
    cy.get('.misc-form').find('#name').click()
    cy.focused().should('have.id', 'name')

    cy.get('.misc-form').find('#description').click()
    cy.focused().should('have.id', 'description')
  })

  context('Cypress.Screenshot', function () {
    it('cy.screenshot() - take a screenshot', () => {
      // https://on.cypress.io/screenshot
      cy.screenshot('my-image')
    })

    it('Cypress.Screenshot.defaults() - change default config of screenshots', function () {
      Cypress.Screenshot.defaults({
        blackout: ['.foo'],
        capture: 'viewport',
        clip: { x: 0, y: 0, width: 200, height: 200 },
        scale: false,
        disableTimersAndAnimations: true,
        screenshotOnRunFailure: true,
        onBeforeScreenshot() {},
        onAfterScreenshot() {}
      })
    })
  })

  it('cy.wrap() - wrap an object', () => {
    // https://on.cypress.io/wrap
    cy.wrap({ foo: 'bar' }).should('have.property', 'foo').and('include', 'bar')
  })
})
