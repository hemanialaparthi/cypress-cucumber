import {Given, When, Then, Before} from "cypress-cucumber-preprocessor/steps";
import AddGuest from "../../POM/AddGuests";
import UpdateCard from "../../POM/Update";

beforeEach(() => {

    // cy.mockReCaptcha();

    cy.login("kovidha@codepeers.com", "Inytes12#")

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
Given("user selects the 1st card from the profile", ()=>
{
    const update = new UpdateCard()
    update.NavigateToTrackTab() 
})
When("click on Add Guest tab", ()=>
{
    const addGuest = new AddGuest()
    addGuest.invitetab()
})
Then("Page should navigate to Invite tab", ()=>
{
    cy.url().should('include', '/#fndtn-invite-tab')
})

Given("Navigate to Add Guests tab", ()=>
{
    const update = new UpdateCard()
    update.NavigateToTrackTab()
    cy.wait(2000) 
    const addGuest = new AddGuest()
    addGuest.invitetab()   
})
When("Provide 2 Guest emails and click on Send Invitation", ()=>
{
    const addGuest = new AddGuest()
    const data= testdata.Guests;
    addGuest.addGuestforNonpremium(data.guestemails) 

})
Then("Invitation should be send to the guests", ()=>
{
    cy.on('window:alert', (text) => {
    expect(text).to.contain('Your invitations have been sent.'); // Validate alert text
    });
})
