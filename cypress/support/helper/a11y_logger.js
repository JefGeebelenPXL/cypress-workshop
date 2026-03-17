export function terminalLog(page, violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )
  cy.task('table', violationData) // Generate table console
  cy.task('generateAxeReport', { page, violations }) // Generate HTML report
}

export function addScreenshot(page, violations) {
  // Define colors based on severity level
  const severityColors = {
    critical: '5px solid red',
    serious: '5px solid orange',
    moderate: '5px solid yellow',
    minor: '5px solid blue'
  }
  violations.forEach((violation) => {
    cy.log(`${violation.id}: ${violation.description} (${violation.impact})`)

    // Apply different colors based on severity
    violation.nodes.forEach((node) => {
      cy.get(node.target.join(', ')).then((el) => {
        cy.wrap(el).invoke(
          'css',
          'outline',
          severityColors[violation.impact] || '3px solid gray'
        )
      })
    })
  })
  // Wait for highlighting to be visible before taking a screenshot
  cy.wait(1000)
  cy.screenshot(`a11y-${page}-violations`, { capture: 'fullPage' })
}
