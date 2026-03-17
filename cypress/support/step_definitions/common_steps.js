import 'cypress-mochawesome-reporter/cucumberSupport'
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import home_page from '../pages/home_page'
import login_page from '../pages/login_page'

afterEach(() => {
  cy.screenshot({ capture: 'viewport' })
})

/*
  ____ _____     _______ _   _
 / ___|_ _\ \   / / ____| \ | |
| |  _ | | \ \ / /|  _| |  \| |
| |_| || |  \ V / | |___| |\  |
 \____|___|  \_/  |_____|_| \_|
 */

Given('i login on saucedemo', () => {
  cy.visit('/')
  login_page
    .enterEmail(Cypress.config('username'))
    .enterPassword(Cypress.config('password'))
    .clickSubmit()
    .iProductsAreLoaded()
})

/*
__        ___   _ _____ _   _
\ \      / / | | | ____| \ | |
 \ \ /\ / /| |_| |  _| |  \| |
  \ V  V / |  _  | |___| |\  |
   \_/\_/  |_| |_|_____|_| \_|
*/

When('placeholder', () => {
  // placeholder
})

/*
 _____ _   _ _____ _   _
|_   _| | | | ____| \ | |
  | | | |_| |  _| |  \| |
  | | |  _  | |___| |\  |
  |_| |_| |_|_____|_| \_|
 */

Then('i can find the following product {string}', (productName) => {
  home_page.iCanFindProductByName(productName)
})
