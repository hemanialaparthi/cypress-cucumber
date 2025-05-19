class AddGuest
{
    clickonaddguest()
    {
        cy.get('#addGuests').click()
        cy.wait(3000)
    }
    addGuestforNonpremium(guestemails)
    {

       cy.get("#tManualEmail").type(guestemails)
       cy.get("#add_guests").click()
       cy.get("#send").click()
       cy.wait(4000)
       cy.on('window:alert', (text) => {
        expect(text).to.contain('Your invitations have been sent.'); // Validate alert text
        });        
      
    }
    invitetab()
    {
        cy.get("#activate-invite-content").click()
    
    }
    tracktab()
    {
        cy.get("#track-tab-link").click()
    
    }
    validationinTracktab()
    {
        cy.url().should('include', '/manage/')
       cy.get('.guest-row-wrap').then(($rows) => {
        const rowCount = $rows.length;
      
        if (rowCount > 0) {
          cy.log(`Invite sent to Guests: ${rowCount}`);
          console.log(`Invite sent to Guests: ${rowCount}`);
        } else {
          cy.log('No data found in the table.');
        }
      
// Total Sent Status
        cy.get('#total-invitees-cnt').invoke('text').then((text) => {
          const totalSent = parseInt(text.trim(), 10);
          cy.log(`Total Sent: ${totalSent}`);
          console.log(`Total Sent: ${totalSent}`);
          expect(rowCount).to.eq(totalSent);
          if (rowCount === totalSent) {
            cy.log(`✅ No. of records is equal to Total Sent count`);
            console.log(`✅ No. of records is equal to Total Sent count`);
          }
          else
          {
            cy.log(`No. of records is not equal to Total Sent count`);
            console.log(`No. of records is not equal to Total Sent count`);
          }
          })
// Awaiting Response Status
      cy.get('#awaiting-response-cnt').invoke('text').then((text) => {
        const awaiting = parseInt(text.trim(), 10);
        cy.log(`Awaiting Response: ${awaiting}`);
        console.log(`Awaiting Response: ${awaiting}`);
      
        })
// Attending Status
      
    //Adults Count
        cy.get('#rsvp-attending-adults').invoke('text').then((text) => {
          const adults = parseInt(text.trim(), 10);
          cy.log(`Attending Adults Count: ${adults}`);
          console.log(`Attending Adults Count: ${adults}`);
        })
    //Kids Count
      cy.get('#rsvp-attending-kids').invoke('text').then((text) => {
        const kids = parseInt(text.trim(), 10);
        cy.log(`Attending Kids Count: ${kids}`);
        console.log(`Attending Kids Count: ${kids}`);
      })

// Tentative Status
      
    //Adults Count
    cy.get('#rsvp-tentative-adults').invoke('text').then((text) => {
      const adults1 = parseInt(text.trim(), 10);
      cy.log(`Tentative Adults Count: ${adults1}`);
      console.log(`Tentative Adults Count: ${adults1}`);
    })
    //Kids Count
      cy.get('#rsvp-tentative-kids').invoke('text').then((text) => {
        const kids1 = parseInt(text.trim(), 10);
        cy.log(`Tentative Kids Count: ${kids1}`);
        console.log(`Tentative Kids Count: ${kids1}`);
      })
 //Bounced Count
      cy.get('#rsvp-bounced-emails').invoke('text').then((text) => {
        const bounced = parseInt(text.trim(), 10);
        cy.log(`Bounced Count: ${bounced}`);
        console.log(`Bounced: ${bounced}`);
      })
//Not attending Count
      cy.get('#rsvp-no-adults').invoke('text').then((text) => {
        const notAttending = parseInt(text.trim(), 10);
        cy.log(`Not Attending Count: ${notAttending}`);
        console.log(`Not Attending Count: ${notAttending}`);
      })

  
    });

      cy.get('.guest-row-wrap').each(($row, rowIndex) => {
        cy.wrap($row)
          .find('.columns.small-12') // Select all columns within the row
          .then(($columns) => {
            const rowData = [];
            
            // Iterate over each column and extract text
            $columns.each((colIndex, col) => {
              rowData.push(col.innerText.trim());
            });
      
            // Log the row data
            cy.log(`Row ${rowIndex + 1}: ${rowData.join(' | ')}`);
            console.log(`Row ${rowIndex + 1}: ${rowData.join(' | ')}`);
          });
      });
      
    }

    EditGuestResponse(response, adultscount, kidscount)
    {
       cy.url().should('include', '/manage/')
       cy.get('.guest-row-wrap').eq(1).find('.right-cog').click()
      //  cy.get('div.edit-rsvp.status-3428').select(response)
       cy.get('#rsvp-adults1').type(adultscount)
       cy.get('#rsvp-kids1').type(kidscount)
       cy.get('#save-3428').click()
       cy.wait(2000)
    }
}

export default AddGuest;