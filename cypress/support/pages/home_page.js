class home_page {
  /*
   _____ _     _____ __  __ _____ _   _ _____ ____
  | ____| |   | ____|  \/  | ____| \ | |_   _/ ___|
  |  _| | |   |  _| | |\/| |  _| |  \| | | | \___ \
  | |___| |___| |___| |  | | |___| |\  | | |  ___) |
  |_____|_____|_____|_|  |_|_____|_| \_| |_| |____/
  * */

  get productTitle() {
    return cy.get('[data-test="title"]')
  }

  get productList() {
    return cy.get('[data-test="inventory-item"]')
  }

  /*
   __  __ _____ _____ _   _  ___  ____  ____
  |  \/  | ____|_   _| | | |/ _ \|  _ \/ ___|
  | |\/| |  _|   | | | |_| | | | | | | \___ \
  | |  | | |___  | | |  _  | |_| | |_| |___) |
  |_|  |_|_____| |_| |_| |_|\___/|____/|____/
  * */

  iProductsAreLoaded() {
    this.productTitle
    return this
  }

  iCanFindProductByName(item) {
    this.productList.contains(item)
    return this
  }
}

export default new home_page()
