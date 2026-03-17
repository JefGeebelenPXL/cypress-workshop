const { defineConfig } = require('cypress')
// Audit Performance + Accessibility
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse')
const fs = require('fs')
const path = require('path')
const { v4 } = require('uuid')

module.exports = defineConfig({
  username: 'standard_user',
  password: 'secret_sauce',
  lighthouseThresholds: {
    performance: 50,
    accessibility: 50,
    'best-practices': 50,
    seo: 50
  },
  lighthouseDesktopOptions: {
    formFactor: 'desktop',
    screenEmulation: { disabled: true }
  },
  lighthouseMobileOptions: {
    formFactor: 'mobile',
    screenEmulation: { disabled: false }
  },
  lighthouseConfig: {
    settings: { output: 'html' },
    extends: 'lighthouse:default'
  },
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
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions)
      })
      on('task', {
        lighthouse: lighthouse((lighthouseReport) => {
          console.log('---- Writing lighthouse report to disk ----')
          const reportHtml = lighthouseReport.report
          fs.writeFileSync(
            'reports-lighthouse/report-' + v4() + '.html',
            reportHtml
          )
        })
      })
      return config
    },
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/*/*.js',
    allowCypressEnv: false
  }
})
