const {defineConfig} = require('cypress');

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
      reportPageTitle: 'ref-template-cypress',
    },
    mochaJunitReporterReporterOptions: {
      'mochaFile': 'reports/junit/junitreport-[hash].xml',
    },
  },
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/*/*.js',
    allowCypressEnv: false
  }
});
