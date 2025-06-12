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
  // click on user profile menu
  cy.visit("https://dev.inytes.com")
  cy.get("#menu-profile-pic").click()
  // click on My Account or My Profile option
  cy.get('.drop-menu').should('be.visible')
  cy.contains('My Profile').click({force: true})
  // verify we're on the account page
  cy.url().should('include', '/account')
});

Then("User should see all profile information fields", () => {
  // check for profile fields
  cy.get('#user_first_name').should('exist')
  cy.get('#user_last_name').should('exist')
  cy.get('#user_email').should('exist')
  
  // verify section heading
  cy.contains('Personal Information').should('exist')
});

When("User updates profile information", () => {
  // update profile information
  cy.get('#user_first_name').clear().type('Updated First')
  cy.get('#user_last_name').clear().type('Updated Last')
  cy.get('#user_phone').clear().type('1234567890')
  // click save button
  cy.get('#update-profile-btn').click({force: true})
});

Then("Changes should be saved successfully", () => {
  // verify success message
  cy.contains('Profile updated successfully').should('be.visible')
});

When("User updates password information", () => {
  // navigate to change password section if it's in a different tab
  cy.contains('Change Password').click({force: true})
  
  // fill in password fields
  cy.get('#current_password').type('Inytes12#')
  cy.get('#new_password').type('NewInytes12#')
  cy.get('#confirm_password').type('NewInytes12#')
  
  // click update password button
  cy.get('#update-password-btn').click({force: true})
});

Then("Password should be updated successfully", () => {
  // verify success message
  cy.contains('Password updated successfully').should('be.visible')
});

When("User enters invalid profile information", () => {
  // enter invalid email format
  cy.get('#user_email').clear().type('invalid-email')
  
  // enter too short first name (assuming there's a minimum length)
  cy.get('#user_first_name').clear().type('A')
  
  // leave required field empty
  cy.get('#user_last_name').clear()
  
  // click save button
  cy.get('#update-profile-btn').click({force: true})
});

Then("Validation error messages should be displayed", () => {
  // check for validation messages
  cy.contains('Please enter a valid email').should('be.visible')
});