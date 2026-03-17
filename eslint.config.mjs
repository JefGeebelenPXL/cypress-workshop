// eslint.config.mjs
import cypress from "eslint-plugin-cypress";

export default [
  {
    // Specify the environment to include Cypress globals
    languageOptions: {
      globals: {
        cy: "readonly", // Cypress global `cy`
        Cypress: "readonly", // Cypress global `Cypress`
        expect: "readonly", // Chai global `expect`
        assert: "readonly", // Chai global `assert`
        describe: "readonly", // Mocha global `describe`
        it: "readonly", // Mocha global `it`
        before: "readonly", // Mocha global `before`
        after: "readonly", // Mocha global `after`
        beforeEach: "readonly", // Mocha global `beforeEach`
        afterEach: "readonly", // Mocha global `afterEach`
      },
    },

    // Including Cypress plugin
    plugins: {
      cypress,
    },

    rules: {
      // Add Cypress-specific rules here
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "warn",
      "cypress/assertion-before-screenshot": "warn",
      "cypress/no-force": "error",
      "cypress/no-pause": "error"
    },

    // Apply the configuration to Cypress-specific files only
    files: ["cypress/**/*.js", "cypress/**/*.ts"],
  },
];
