describe('Create Invitation with Locate address', () => {

    const title = 'Diwali festival';
    const phoneNo = '9988776655';
    const venue = 'Home';
    const location = 'Sri sai nilayam';
    const mesg = 'Please welcome';
    const regionalmesg = 'Weclome';
    const occasions = 'Pooja';
    const guestemails = 'kovidha2602@gmail.com';
    const cardNo ="3782 822463 10005";
    const expirydate= "10 / 25";
    const CVV = "809";
    const cohostName= "Krishna";
    const cohostEmail= "krishna.b260265@gmail.com";
    const editTitle = "Diwali Celebrations";
    const editHostname= "Kovidha Bhogineni";
    const editPhone= "9988776677";
    const editstartTime="07:30 PM";
    const editendTime= "11:30 PM";
    const editVenue="Home-BlockA";
    const editLocation="7th Ave San Francisco, CA 94112";

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
    
    it('Create Invitation with Indian Address', () => {

        cy.wait(5000)

      cy.visit("https://dev.inytes.com")
      

      cy.contains('Create Invitation').click()

      cy.url().should('include', '/invitations')

      cy.contains('a', 'First Birthday').click({force:true});
      cy.wait(4000)
      cy.get('#mix-up-list').find('.cd-item').eq(0).click();

      cy.wait(2000)

      cy.contains('a', 'Personalize').should('exist').click()

      cy.get('#nextDetails').click()
      cy.wait(10000)
      cy.get("#vTitle", { timeout: 15000 }).should('be.visible').type(title)
      cy.get('#vPhone').type(phoneNo)
      cy.get('#vLocationName').type(venue)
      cy.get('#vFA').type(location).wait(4000)
      cy.get('.pac-item').first().click(); // Click the first suggestion

      cy.get('#nextSettings').click()

      cy.get('#addMessage').click({ force: true })

      cy.get('#tMessageieditor').type(mesg)
      
      cy.get('#addLangMessage').click({ force: true })

      cy.get('#tOtherMessage').type(regionalmesg).type('{enter}')

      cy.get('#create-preview-card').click()

      cy.get('#addGuests').scrollIntoView()

      cy.wait(1000)
      cy.get('#invitation-ready').should('contain', 'All set. Your invitation ready to send.')

    });

    });