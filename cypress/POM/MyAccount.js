class Myaccount
{
    NavigateToInvitationsTab()
    {
        cy.visit("https://dev.inytes.com")
        //Click on Profile
          cy.get("#menu-profile-pic").click()

        //Click on the Invitation from the list

        cy.get('.drop-menu').should('be.visible');
        //click on view all link
        cy.wait(2000)
        cy.get('a.button[title="My Inytes"]').contains('View All').click();
        cy.url().should('include', '/account/#fndtn-invitations-tab')

    }
    
    cardDetails()
    {
        cy.get('.event-column').each(($card, index) => {
            cy.wrap($card).within(() => {
              // Get title
              cy.get('.event-desc-header').invoke('text').then((title) => {
                const eventTitle = title.trim();
                if (eventTitle.toLowerCase().includes('canceled')) {
                    cy.log('❌ Canceled event:', eventTitle);
                  } else {
                    cy.log('✅ Active event:', eventTitle);
                  }
    
          
                // Paragraph fields
                cy.get('p').then(($ps) => {
                  const dateTime = $ps.eq(0).text().trim();
                  const location = $ps.eq(1).text().trim();
                  const hostType = $ps.eq(2).text().trim();
          
                  // Guest count (optional)
                  const guestCount = Cypress.$('.event-guest-count', $card).text().trim() || 'No guest count info';
          
                  // Labels (optional ribbons like Premium, Cohost)
                  const ribbons = Cypress.$('.ribbon', $card).map(function () {
                    return Cypress.$(this).text().trim();
                  }).get();
                  const labelList = ribbons.length ? ribbons : ['No labels present'];
           
                  // Final log
                  cy.log(`Card ${index + 1}`);
                  cy.log(`Title: ${eventTitle}`);
                  cy.log(`Date/Time: ${dateTime}`);
                  cy.log(`Location: ${location}`);
                  cy.log(`Host Type: ${hostType}`);
                  cy.log(`Guest Count: ${guestCount}`);
                  cy.log(`Labels: ${labelList.join(', ')}`);
                });
              });
            });
          });
                 
     }

     Swap()
     {
        cy.get('.event-column').each(($card, index, $list) => {
            const ribbons = $card.find('.ribbon'); // Using jQuery to search inside each card
          
            const hasSwap = [...ribbons].some(r => r.innerText.toLowerCase().includes('swap'));
          
            if (hasSwap) {
              cy.wrap($card).find('.ribbon').contains(/swap/i).first().click();
              cy.log(`Clicked on SWAP label in card #${index + 1}`);
              return false; // Break out of .each loop after first match
            }
          });

        // Capture the cards which are able to swap

        const targetEventTitle = 'Engagement-Event c'; // Replace with your actual target title
    
        // Step 1: Ensure the modal is open
        cy.get('#swapModal').should('be.visible');
    
        // Step 2: Loop through each event card in the modal
        cy.get('#swap_div .event-column').each(($card) => {
          // Step 3: Find the event title and check if it matches the target
          cy.wrap($card).find('.event-desc-header').invoke('text').then((eventTitle) => {
            const trimmedTitle = eventTitle.trim();
    
            if (trimmedTitle === targetEventTitle) {
              cy.log(`🎯 Found matching card: ${trimmedTitle}`);
              
              // Step 4: Capture details inside the card (date, location, guest count)
              cy.wrap($card).within(() => {
                // Capture Event Date
                cy.get('.event-info p').eq(0).invoke('text').then((eventDate) => {
                  const trimmedEventDate = eventDate.trim();
                  cy.log(`Event Date: ${trimmedEventDate}`);
                });
    
                // Capture Event Location
                cy.get('.event-info p').eq(1).invoke('text').then((eventLocation) => {
                  const trimmedEventLocation = eventLocation.trim();
                  cy.log(`Event Location: ${trimmedEventLocation}`);
                });
    
                // Capture Guest Count
                cy.get('.event-guest-count').invoke('text').then((guestCount) => {
                  const trimmedGuestCount = guestCount.trim();
                  cy.log(`Guest Count: ${trimmedGuestCount}`);
                });
              });
    
              // Step 5: Re-query the "Make it Premium" ribbon text
              cy.wrap($card).find('.ribbon').invoke('text').then((ribbonText) => {
                const ribbonLabel = ribbonText.trim().toLowerCase();
    
                // Check if the "Make it Premium" text exists
                if (ribbonLabel.includes('make it premium')) {
                  cy.log(`✅ Found "Make it Premium" on card: ${trimmedTitle}`);
    
                  // Step 6: Click the "Make it Premium" ribbon with force (in case it's covered)
                  cy.wrap($card).find('.ribbon').click({ force: true });
    
                  // Optional: Wait for some time for modal action to complete (if needed)
                  cy.wait(1000);  // Adjust wait time if necessary
    
                  // Step 7: After action, ensure the modal has updated or closed
                  cy.get('#swapModal').should('not.exist'); // Or you can wait for a new element indicating the change
                } else {
                  cy.log(`❌ "Make it Premium" not found on card: ${trimmedTitle}`);
                }
              });
            }
          });
        });
      
      
    



     }
          
}

export default Myaccount;