import Home_page from './home_page'
import home_page from './home_page'

class login_page {
  /*
   _____ _     _____ __  __ _____ _   _ _____ ____
  | ____| |   | ____|  \/  | ____| \ | |_   _/ ___|
  |  _| | |   |  _| | |\/| |  _| |  \| | | | \___ \
  | |___| |___| |___| |  | | |___| |\  | | |  ___) |
  |_____|_____|_____|_|  |_|_____|_| \_| |_| |____/
  * */

  get emailTxtFld() {
    return cy.get('#user-name').should('be.visible')
  }

  get passwordTxtFld() {
    return cy.get('#password').should('be.visible')
  }

  get submitBtn() {
    return cy.get('#login-button').should('be.visible')
  }

  /*
   __  __ _____ _____ _   _  ___  ____  ____
  |  \/  | ____|_   _| | | |/ _ \|  _ \/ ___|
  | |\/| |  _|   | | | |_| | | | | | | \___ \
  | |  | | |___  | | |  _  | |_| | |_| |___) |
  |_|  |_|_____| |_| |_| |_|\___/|____/|____/
  * */

  enterEmail(email) {
    this.emailTxtFld.type(email, { delay: 200 })
    return this
  }

  enterPassword(pass) {
    this.passwordTxtFld.type(pass, { delay: 200 })
    return this
  }

  clickSubmit() {
    this.submitBtn.click()
    return home_page
  }
}

export default new login_page()
