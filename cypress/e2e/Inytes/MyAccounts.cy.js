import {Given, When, Then, Before} from "cypress-cucumber-preprocessor/steps";
import Myaccount from "../../POM/MyAccount";
beforeEach(() => {

    // cy.mockReCaptcha();

    cy.login("hemanialaparthi@gmail.com", "IamTesting")

    Cypress.on('uncaught:exception', (err, runnable) => {
      // Return false to prevent Cypress from failing the test on uncaught exceptions
      return false;

      cy.intercept('POST', 'https://r.stripe.com/0', {
        statusCode: 200,
        body: { success: true }
      }).as('stripeRequest');
    });
    
  });

  let testdata;
  before(() => {
    cy.fixture('testData').then((data) => {
      testdata = data;  // Store the fixture data globally for access in steps
    });
  });

When("navigated to Invitaions tab", ()=>
{
        const card = new Myaccount()
        card.NavigateToInvitationsTab()
 })

Then("capture all the card details", ()=>
{
        const card = new Myaccount()
        card.cardDetails()
})

Given("navigated to Invitaions tab", ()=>
{
        const card = new Myaccount()
        card.NavigateToInvitationsTab()
})
When("perform swap application", ()=>
 {
        const card = new Myaccount()
        card.Swap()
})
Then("Invitation need to be swaped", ()=>
{
        const card = new Myaccount()
        card.Swap()
 })