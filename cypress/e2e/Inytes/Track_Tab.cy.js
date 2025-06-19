import {Given, When, Then, Before} from "cypress-cucumber-preprocessor/steps";
import UpdateCard from "../../POM/Update";
import AddGuest from "../../POM/AddGuests";
import CreateCard from "../../POM/Create";
import ManageTrack from "../../POM/Manage";

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

  When("user selects the 1st card from the profile", ()=>
    {
            const update = new UpdateCard()
            update.NavigateToTrackTab()         
     })
  Then("page should navigate to the Manage Invitation page and view the data.", ()=>
  {
    const addGuest=new AddGuest()
    addGuest.validationinTracktab()
  })

Given("Provide 2 Guest emails and click on Send Invitation after navigating to Add Guests tab",()=>
{
    const update = new UpdateCard()
    update.NavigateToTrackTab()  
    cy.wait(2000) 
    const addGuest = new AddGuest()
    addGuest.invitetab() 
    const data= testdata.Guests;
    addGuest.addGuestforNonpremium(data.guestemails)   
})
When("Click on Track tab", ()=>
{
    const addGuest = new AddGuest()
    addGuest.tracktab() 
})
Then("Guests list should display.", ()=>
{ 
    const addGuest=new AddGuest()
    addGuest.validationinTracktab()

})

When("user updates the rsvp in track tab", ()=>
{
  const addGuest = new AddGuest()
  const edit= testdata.editresponse;
  const update = new UpdateCard()
    update.NavigateToTrackTab()  
    cy.wait(2000) 
  addGuest.EditGuestResponse(edit.response, edit.adultscount, edit.kidscount)
})

Then("count of the guests need to be updated", ()=>
{
  cy.get('.guest-row-wrap').eq(1).find('.status-text').invoke('text').then((text) => {
    cy.log('Guest Status:', text.trim());
  });
  cy.get('.guest-row-wrap').eq(1).find('span.counts').first().invoke('text').then((text) => {
    cy.log('Adults Count:', text.trim());
  });
  cy.get('.guest-row-wrap').eq(1).find('.counts.append').invoke('text').then((text) => {
    cy.log('Kids Count:', text.trim());
  });
  const addGuest = new AddGuest()
  addGuest.validationinTracktab()
})

When("Navigate to Manage track tab after creating the Invitation.", ()=>
{
      const create = new CreateCard()
      const add= testdata.Create;
      create.categoryselect(add.category)
      create.createInvite(add.title, add.phoneNo, add.venue, add.location, add.mesg, add.regionalmesg)
      create.NavigateToTrackTab()    
})
Then("Copy link, QR Code, Download, Print should not able to perform.",()=>
{
    const action= new ManageTrack()
    action.PerformActionsforNonPremiumCard()

})

Given("Navigate to Manage track tab after creating the Invitation.", ()=>
{
      const create = new CreateCard()
      const add= testdata.Create;
      create.categoryselect(add.category)
      create.createInvite(add.title, add.phoneNo, add.venue, add.location, add.mesg, add.regionalmesg)
      create.NavigateToTrackTab()
})

Given("Navigate to Manage track tab.", ()=>
{
     const track = new ManageTrack()
     track.NavigateToTrackTab()
})

When("cancel the Invitation", ()=>
{
      const test = new ManageTrack()
      test.cancelInvite()
})

Then("Invitation need to be cancelled.", ()=>
{
   cy.wait(3000)
   cy.url().should('include', '/#fndtn-invitations-tab')
})

When("click on Cancel button", ()=>
  {
        const test = new ManageTrack()
        test.cancelInvite0()
  })
  
  Then("Validation message need to display.", ()=>
  {
      cy.get('.sa-error-container p').contains(
        'Cancel reason is required.'
      );
  })

  Given("Navigate to Manage track tab and click on cancel button.", ()=>
    {
         const track = new ManageTrack()
         track.NavigateToTrackTab()
         track.cancelInvite0()
    })

    When("enter the reason and click on cancel", ()=>
      {
        cy.get('.sweet-alert input[placeholder="Cancel reason"]').type('Event postponed due to weather');
        cy.get('.sweet-alert .confirm').click();
      })