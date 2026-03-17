const {defineConfig} = require('cypress');
// Cucumber
const cypressOnFix = require('cypress-on-fix');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {addCucumberPreprocessorPlugin} = require('@badeball/cypress-cucumber-preprocessor');
const {createEsbuildPlugin} = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  env: {
    password: 'secret_sauce',
  },
  expose: {
    username: 'standard_user',
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
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, config) {
      // "cypress-on-fix" is required because "cypress-mochawesome-reporter" and "cypress-cucumber-preprocessor" use the same hooks
      on = cypressOnFix(on);
      require('cypress-mochawesome-reporter/plugin')(on);
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({plugins: [createEsbuildPlugin(config)]}));
      return config;
    },
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/*/*.feature',
    allowCypressEnv: false
  }
});
