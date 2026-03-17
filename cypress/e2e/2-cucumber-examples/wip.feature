Feature: Saucedemo test a user i can login

  Scenario: I can login with the default user
    Given i login on saucedemo
    Then i can find the following product "Bike"