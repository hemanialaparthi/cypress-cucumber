import {Given, When, Then, Before} from "cypress-cucumber-preprocessor/steps";
import CreateCard from "../../POM/Create";
import AddGuest from "../../POM/AddGuests";
import UpdateCard from "../../POM/Update";
import ManageTrack from "../../POM/Manage";

beforeEach(() => {
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


Given("Create US address invitation.", ()=>
{
    const createdata = testdata.CreateUS;
    const create = new CreateCard()
    create.categoryselect(createdata.category)
    create.createInvite(createdata.title, createdata.phoneNo, createdata.venue, createdata.USlocation, createdata.mesg, createdata.regionalmesg)
})

When("Add guests and navigate to track tab.", ()=>
{
  const createdata = testdata.CreateUS;
  const guests = testdata.Guests;
  const manage = new ManageTrack()
  const addGuest = new AddGuest()
  manage.TrackTabfromCreate(createdata.title)
  manage.ClickOnAddGuestInTrackTab()
  addGuest.addGuestforNonpremium(guests.guestemails)
  
     
})

Then("Capture all the details in Track tab.", ()=>
{
  const manage = new ManageTrack()
  const addGuest = new AddGuest()
  addGuest.tracktab()
  manage.validationoforGuestsCountinTracktab()
})

Given("Update Invitation by selecting all the radio buttons", ()=>
{
        const update = new UpdateCard()
        update.NavigateToTrackTab()
        update.clickonEdit()  
        update.selectAllradiobuttons()
       
})
When("click on Manage", ()=>
 {
        const update = new UpdateCard()
        update.Manage()
       
        cy.wait(3000)
})
Then("Page should navigate to Track tab and verify all the functionality", ()=>
{
        const manage = new ManageTrack()
        manage.validationofLeftsideCardinTracktab()
})

Given("Navigate to Add guests tab after creating the Invitation", ()=>
  {
          const createdata = testdata.Create;
          const create = new CreateCard()
          // const guest = new AddGuest()
          create.categoryselect(createdata.category)
          create.AftercreateclickonAddGuest(createdata.title, createdata.phoneNo, createdata.venue, createdata.location, createdata.mesg, createdata.regionalmesg)
          // guest.clickonaddguest()

  })
  When("add 2 guests", ()=>
  {
          const addguest = testdata.Guests;
          const guest = new AddGuest()
          guest.addGuestforNonpremium(addguest.guestemail)
          cy.wait(3000)
  })
  Then("Invitation should sent to the guests.", ()=>
  {
        //  const tracktab = testdata.Guests;
        const guest = new AddGuest()
         guest.tracktab()
         cy.url().should('include', "/#fndtn-invite-tab")
         cy.get('#guest-rows-wrap').should('have.length', 2)
  })

  Given("Update Invitation by selecting all the radio buttons and click on Manage.", ()=>
    {
            const update = new UpdateCard()
            update.NavigateToTrackTab()
            update.clickonEdit()  
            update.selectAllradiobuttons()
            update.Manage()
            cy.wait(3000)

    })

  When("Add Guests and click on Track tab", ()=>
  {
      cy.contains("Add Guests").click()
      const addguest = testdata.Guests;
      const guest = new AddGuest()
      guest.addGuestforNonpremium(addguest.guestemails)
      cy.wait(3000)

  })

  Then("Verify Guests details and count in the track tab", ()=>
  {
      const addGuest=new AddGuest()
      addGuest.validationinTracktab()
  })
 
   