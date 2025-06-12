import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Login from "../../POM/Login";

// this beforeEach hook will run before each scenario
beforeEach(() => {
  cy.login("kovidha@codepeers.com", "Inytes12#")

  Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from failing the test on uncaught exceptions
    return false;
  });
});

// optional: Load test data from fixtures
let testdata;
before(() => {
  cy.fixture('testData').then((data) => {
    testdata = data;
  });
});

When("User navigates to My Account page", () => {
  // click on My Account option
  cy.visit("https://dev.inytes.com")
  cy.get("#menu-profile-pic").click()
  cy.get('.drop-menu').should('be.visible')
  cy.contains('My Account').click({force: true})

  // wait for page to load
  cy.wait(2000)
  // verify we're on the account page
  cy.url().should('include', '/account')
});

Then("User should see all profile information fields", () => {
  // check for profile fields
  cy.get('#account-form-fn-value').should('exist')
  cy.get('#account-form-ln-value').should('exist')
  cy.get('#account-form-ph-value').should('exist')
  cy.get('#account-form-address-value').should('exist')
  cy.get('#account-form-city-value').should('exist')

  // verify section heading
  cy.contains('Edit Profile').should('exist')
});

When("User updates profile information", () => {
  // update profile information
  cy.get('#account-form-fn-value').clear().type('Updated First')
  cy.get('#account-form-ln-value').clear().type('Updated Last')
  cy.get('#account-form-ph-value').clear().type('1234567890')
  // click save button
  cy.get('#account-modify-submit').click({force: true})
});

Then("Changes should be saved successfully", () => {
  // verify success message
  cy.contains('Saved').should('be.visible')
});

When("User enters invalid profile information", () => {
  // enter too short first name (assuming there's a minimum length)
  cy.get('#account-form-fn-value').clear().type('A')
  
  // leave required field empty
  cy.get('#account-form-ln-value').clear()
  
  // click save button
  cy.get('#account-modify-submit').click({force: true})
});

Then("Validation error messages should be displayed", () => {
  // check for validation messages
  cy.contains('Please enter a valid email').should('be.visible')
});