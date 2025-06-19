import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Login from "../../POM/Login";

// this beforeEach hook will run before each scenario
beforeEach(() => {
  cy.login("hemanialaparthi@gmail.com", "IamTesting")

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
  // Update profile information without touching the address field
  cy.get('#account-form-fn-value').clear().type('Updated First')
  cy.get('#account-form-ln-value').clear().type('Updated Last')
  cy.get('#account-form-ph-value').clear().type('1234567890')
  cy.get('#account-form-city-value').clear().type('Test City')
  
  // click save button
  cy.get('#account-modify-submit').should('contain', 'Save Profile').click({force: true})
  cy.wait(2000)
});

Then("Changes should be saved successfully", () => {
  // Verify the button text changed to "Saved"
  cy.get('#account-modify-submit').should('contain', 'Saved')
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

When("User clicks on Delete your account option", () => {
  // scroll to the bottom where the delete option is located
  cy.scrollTo('bottom')
  
  // click the delete account link using its ID
  cy.get('#deleteAccount').click({force: true})
  
  // wait for popup to appear
  cy.wait(1000)
});

Then("Delete account confirmation popup should appear", () => {
  // check if the confirmation popup appeared
  cy.contains('Are you sure you want to delete?').should('be.visible')
  
  // check if the "Delete account" button exists in the popup
  cy.contains('button', 'Delete account').should('be.visible')
});

Then("User cancels the deletion", () => {
  // click Cancel to close the popup without deleting
  cy.contains('button', 'Cancel').click({force: true})
  
  // wait for popup to close
  cy.wait(500)
  
  // verify we're still on the account page
  cy.url().should('include', '/account')
});

When("User creates a disposable test account", () => {
  // We'll use the existing logged-in account for deletion testing
  // Store credentials for verification later
  cy.writeFile('cypress/fixtures/disposable-account.json', {
    email: "hemanialaparthi@gmail.com",
    password: "IamTesting"
  })
});

When("User navigates to My Account page with disposable account", () => {
  // Navigate to account page (already logged in from beforeEach)
  cy.visit('https://dev.inytes.com/account')
  cy.wait(2000)
  cy.url().should('include', '/account')
});

When("User clicks on Delete your account option", () => {
  cy.scrollTo('bottom')
  cy.get('#deleteAccount').click({force: true})
  cy.wait(1000)
});

When("User confirms account deletion in the popup", () => {
  cy.contains('button', 'Delete account').click({force: true})
  cy.wait(3000)
});

Then("Account should be completely deleted from the system", () => {
  // Verify redirect away from account page
  cy.url().should('not.include', '/account')
  
  // Try to login with deleted credentials
  cy.readFile('cypress/fixtures/disposable-account.json').then((account) => {
    cy.visit('https://dev.inytes.com/login')
    cy.wait(2000)
    
    cy.get('#user_login').type(account.email)
    cy.get('#user_password').type(account.password) 
    cy.get('#email-login').click({force: true})
    cy.wait(3000)
    
    // Should show error or stay on login page
    cy.url().should('include', '/login')
    cy.get('#user_login').should('be.visible')
  })
});