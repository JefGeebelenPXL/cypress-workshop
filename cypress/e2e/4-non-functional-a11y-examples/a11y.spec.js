import {addScreenshot, terminalLog} from '../../support/helper/a11y_logger.js'

describe('Accessibility checks', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/actions')
        cy.injectAxe() // Injects the axe-core runtime into the page under test
    })

    it('should have no accessibility violations on load', () => {
        const context = 'home-page'
        cy.checkA11y(null,
            {
                includedImpacts: ['critical', 'serious', 'moderate', 'minor'],
                rules: {
                    'aria-hidden-focus': { enabled: true }, // Elements with aria-hidden should not contain focusable elements
                    'color-contrast': { enabled: true }, // Ensures sufficient contrast between text and background
                    'image-alt': { enabled: true }, // Ensures <img> elements have alt attributes
                    'label': { enabled: true }, // Ensures form elements have labels
                    'empty-heading': { enabled: true } // Ensures headings are not empty
                },
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag2aa', 'best-practices']
                }
            }, (violations) => {
                terminalLog(context, violations)
                addScreenshot(context, violations)
            })

    })
})
