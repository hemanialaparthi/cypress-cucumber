import {Given, When, Then, Before} from "cypress-cucumber-preprocessor/steps";
import UpdateCard from "../../POM/Update";

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
  Then("page should navigate to the Manage Invitation page.", ()=>
  {
       cy.url().should('include', '/manage/')
  })

  When("Navigated to Edit Invitation", ()=>
  {
    const update = new UpdateCard()
    update.NavigateToTrackTab()
    update.clickonEdit()  

  })

  Then("Cohost details are provided and click on Save Card", ()=>
  {
    const update = new UpdateCard()
    const updatedata= testdata.Cohost;
    update.providecohostdetails(updatedata.cohostName, updatedata.cohostEmail)

  })

  Then("Edit all the details in the Edit Invitation", ()=>
    {
      const update = new UpdateCard()
      const updatedata= testdata.Update;
      update.EditAllDetailsinTrail(updatedata.editTitle, updatedata.editHostname, updatedata.editPhone, updatedata.editcohostName, updatedata.editcohostEmail, updatedata.editstartTime, updatedata.editendTime, updatedata.editVenue, updatedata.editLocation, updatedata.editmesg, updatedata.editregionalmesg )
  
    })

 Given("Navigate to Manage Invitation page of the 1st card", ()=>
      {
        const update = new UpdateCard()
        update.NavigateToTrackTab()
    
      })
When("click on Upgarde and upgrade to premium",()=>
{
  const update = new UpdateCard()
  const carddata= testdata.Card;
   update.upgradeInvitation(carddata.cardNo, carddata.expirydate, carddata.CVV)
})

Then("Invitation need to be upgraded", ()=>
{
  cy.url().should('include', '/manage/')
})

Given("Navigated to Edit Invitation", ()=>
  {
    const update = new UpdateCard()
    update.NavigateToTrackTab()
    update.clickonEdit()  

  })
When("Click on Add Manually",()=>
{
  const update = new UpdateCard()
  update.ClickAddManually()  
  
})
Then("Alert popup should appear", ()=>
{
  cy.on('window:alert', (text) => {
    expect(text).to.equal('The unsaved address information will be lost. Please confirm. '); // Validate alert text
  });
  
})

Then("Edit the location from Locate address to Manual address.", ()=>
  {
    const update = new UpdateCard()
    const editMA = testdata.Manual_US_Location;  
    update.EditInviteManually(editMA.address, editMA.city, editMA.state, editMA.zip, editMA.liveurl)
    
  })


  Then("Edit the location from manual address to locate address.", ()=>
    {
      const update = new UpdateCard()
      const editL = testdata.Update;  
      update.EditInviteLocateAddress(editL.editLocation)
      
    })
 When("Click on Manual address and leave all the fields blank and save the card.", ()=>
      {
        const update = new UpdateCard()
        update.EditInviteManuallyBlank()
        
      })

 When("Click on Manual address and clear data in all the fields.", ()=>
        {
          const update = new UpdateCard()
          update.EditInviteManuallyclear()
          
        })
  Then("an alert message and validation messages should display.", ()=>
  {
     cy.get('#ui_notifIt p').should('contain', "To save the invitation, please fill the event address on the Locate address/Add address Manually section.")
     cy.checkValidation('#parsley-id-27', 'This value is required.');
     cy.checkValidation('#parsley-id-29', 'This value is required.');
     cy.checkValidation('#parsley-id-31', 'This value is required.');
     cy.checkValidation('#parsley-id-33', 'Zipcode is required.');


  })

  Then("update the Invitation by selecting all the radio buttons",()=>
  {
    const update = new UpdateCard()
    update.selectAllradiobuttons()
  })
  
  Then("update the Invitation by unselecting all the radio buttons", ()=>
  {
      const update = new UpdateCard()
      update.unselectAllradiobuttons()
  })

  Then("User should able to receive an alert message when trying to update the address from locate to add manually", () => {
    cy.url().should('include', '/edit-invitation/')
    
    //Click on Next
    cy.get("#nextDetails").click()
    cy.wait(10000)
    
    // Set up alert handler before the action
    cy.window().then((win) => {
      cy.stub(win, 'alert').returns(true).as('windowAlert')
    })
    
    // Click on manual address tab to trigger the alert
    cy.get('#manual_addr_tab').click() 
    
    // Verify the alert message appeared
    cy.get('@windowAlert').should('have.been.calledWith', 'The unsaved address information will be lost. Please confirm. ')
  })



