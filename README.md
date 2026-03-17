# ref-template-cypress
functional test automation framework for testing.

## __Warning__
Cypress 1.5.10 has introduced a breaking change in how environment variables are handled. The old Cypress.env() function has been deprecated and is replaced with cy.env() and cy.expose() with a stricter usage.

In this template the examples have been updated to use the new methods and the config files have been set to __not__ allow Cypress.env(). Many dependencies made use of this and have not yet migrated. In this suite the cucumber plugin is a notable example. This needs to be updated once their fix is available.

### Lighthouse
cypress-audit/lighthouse which is used to include lighthouse checks in this suite is no longer being maintained and contains several high severity vulnerabilities.

Be aware of these risks untill it can be replaced with another implentation.

## Overview

- Tests
- Installation
- Running
- Framework
    - eslint
    - cucumber
    - lighthouse

## Tests

| feature        | tests                  |
|:---------------|:-----------------------|
| App Unlock     | login & logout of user |
| ....           | other functionalities  |

## Installation

```bash
npm install
```

```bash
npm install cypress
```

```bash
npm install eslint-plugin-cypress --save-dev
```

## Running
Some predefined scripts can be found in the package.json. By executing the compile scripts triggers ESLint to perform code 
checks across your entire repository. Running the Cypress scripts will execute the tests.
```json
{
  "scripts": {
    "compile": "npx eslint 'cypress/**/*.js'",
    "compile:fix": "npx eslint 'cypress/**/*.js' --fix",
    "cypress:open:specs": "npx cypress open --config-file cypress.config.spec.js",
    "cypress:run:specs": "npm run clean:data && npm run run:specs",
    "run:specs": "npx cypress run --config-file cypress.config.spec.js --spec 'cypress/e2e/1-advanced-examples/*.js'",
    "cypress:run:non-functional-examples": "npm run clean:data && npm run run:non-functional-examples",
    "run:non-functional-examples": "npx cypress run --browser chrome --config-file cypress.config.spec.js --spec 'cypress/e2e/3-non-functional-examples/*.js'",
    "cypress:open:cucumber": "npx cypress open --config-file cypress.config.cucumber.js",
    "cypress:run:cucmber": "npm run clean:data && npm run run:cucumber",
    "run:cucumber": "npx cypress run --config-file cypress.config.cucumber.js --spec 'cypress/e2e/2-cucumber-examples/*.feature'",
    "clean:data": "npm run clean:report && npm run clean:performance:reports && npm run clean:a11y:reports && npm run clean:videos && npm run clean:screenshots",
    "clean:report": "rm -rf ./reports/*",
    "clean:performance:reports": "rm -rf ./reports-lighthouse/*",
    "clean:a11y:reports": "rm -rf ./reports-a11y/*",
    "clean:videos": "rm -rf ./cypress/videos",
    "clean:screenshots": "rm -rf ./cypress/screenshots"
  } 
}
```

## Framework

### eslint
ESLint is a popular open-source JavaScript linting tool that helps developers find and fix problems in their JavaScript code. 
Linting refers to the process of analyzing code to detect potential errors, coding style violations, or other issues that could 
lead to bugs or maintainability problems.

### cucumber
Cucumber.js is a testing tool for JavaScript that supports Behavior-Driven Development (BDD). It allows you to write tests in
plain language, using Gherkin syntax, and then execute those tests against your code to ensure it meets specified behaviors.

### lighthouse
Google Lighthouse is an open-source, automated tool designed to help developers improve the quality of web pages. It provides
insights and recommendations across several key areas, including performance, accessibility, SEO (Search Engine Optimization), and more.
