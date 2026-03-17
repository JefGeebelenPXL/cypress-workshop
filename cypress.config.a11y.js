const { defineConfig } = require('cypress')
const fs = require('fs')
const path = require('path')
const { v4 } = require('uuid')
const { createHtmlReport } = require('axe-html-reporter')

module.exports = defineConfig({
  username: 'standard_user',
  password: 'secret_sauce',
  pageLoadTimeout: 60000,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reportDir: 'reports',
      charts: true,
      saveJson: true,
      saveAllAttempts: false,
      reportPageTitle: 'ref-template-cypress'
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'reports/junit/junitreport-[hash].xml'
    }
  },
  retries: {
    runMode: 0,
    openMode: 0
  },
  e2e: {
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      on('after:screenshot', (details) => {
        // Check if the screenshot is related to a11y (modify as needed)
        if (details.name.includes('a11y')) {
          const newFolder = 'reports-a11y' // Target folder
          const newPath = path.join(newFolder, path.basename(details.path))

          return new Promise((resolve, reject) => {
            // Ensure the directory exists
            if (!fs.existsSync(newFolder)) {
              fs.mkdirSync(newFolder, { recursive: true })
            }

            // Move the screenshot
            fs.rename(details.path, newPath, (err) => {
              if (err) return reject(err)
              resolve({ path: newPath })
            })
          })
        }
      })
      on('task', {
        log(violations) {
          console.log(violations)
          return null
        },
        table(violations) {
          console.table(violations)
          return null
        },
        generateAxeReport({ page, violations }) {
          if (violations.length) {
            const getFormattedDateTime = () => {
              const now = new Date()
              return now.toISOString().replace(/[:.]/g, '-') // Format to avoid invalid filename characters
            }
            const reportPath = path.join(
              `reports-a11y`,
              `a11y-${page}-report-${getFormattedDateTime()}.html`
            )
            createHtmlReport({
              results: { violations },
              options: {
                outputDir: path.dirname(reportPath),
                reportFileName: path.basename(reportPath)
              }
            })
          }
          return null
        }
      })
      return config
    },
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/*/*.js',
    allowCypressEnv: false
  }
})
