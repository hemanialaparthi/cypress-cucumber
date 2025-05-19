class ManageTrack
{

  NavigateToTrackTab()
    {

          cy.visit("https://dev.inytes.com")
        //Click on Profile
          cy.get("#menu-profile-pic").click()

        //Click on the Invitation from the list

        cy.get('.drop-menu').should('be.visible');

        cy.get('.menu-event-item').eq(2).should('be.visible').click();
        cy.wait(6000)
        cy.get('body').then(($body) => {
          if ($body.find('div.row.row-full.upgrade-section').length > 0) {
            cy.get('#upgrade-section-close').should('be.visible'); // Optional: Verify it's visible
            cy.get('#upgrade-section-close').click({force:true}); // Click to close the popup
          }
        });
    }

    TrackTabfromCreate(title)
    {
      
      cy.get("#menu-profile-pic").click()

      //Click on the Invitation from the list
      cy.wait(20000)
      cy.get('.drop-menu').should('be.visible');

      cy.get('.menu-event-item').each(($el) => {
        cy.wrap($el).find('.menu-event-title').invoke('text').then((titleText) => {
          if (titleText.trim() === title) {
            cy.wrap($el).should('be.visible').click();
          }
        });
      });
      cy.wait(6000)
      cy.get('body').then(($body) => {
        if ($body.find('div.row.row-full.upgrade-section').length > 0) {
          cy.get('#upgrade-section-close').should('be.visible'); // Optional: Verify it's visible
          cy.get('#upgrade-section-close').click({force:true}); // Click to close the popup
        }
      });

    }

    ClickOnAddGuestInTrackTab()
    {
       cy.contains("Add Guests").click()
    }
    PerformActionsforNonPremiumCard()
    {
      cy.url().should('include', '/manage/')
    // Assert for Copy link
      cy.get('.copy-content-wrap').click({multiple:true})
      cy.get('#ui_notifIt').contains("Premium upgrade is required to copy the invitation link.").should('exist')
      cy.get('.qr-content-wrap').click()
      cy.get('#ui_notifIt').contains("Premium upgrade is required for QR.").should('exist')
      cy.wait(2000)
      cy.get('#premium_download').click()
      cy.get('#ui_notifIt').contains("Premium upgrade is required to download  the invitation.").should('exist')
      cy.get('#printTooltip').click()
      cy.get('.tooltip-text').contains("Print is currently unavailable, reach out to support@inytes.com for assistance").should('exist')

    }
    
    validationofLeftsideCardinTracktab()
    {
      cy.url().should('include', '/manage/')
        // Assert for Copy link
      cy.get('.copy-content-wrap').should('be.visible').then(($el)=>
        {
          if($el.length>0)
          {
            cy.log('Copy link is present.');

          }
          else{
            cy.log('Copy link is not present.');
          }
        })
      cy.get('.qr-content-wrap').should('be.visible').then(($el)=>
        {
          if($el.length>0)
          {
            cy.log('Copy link is present.');

          }
          else{
            cy.log('Copy link is not present.');
          }
        })
      cy.get('#copy-content').should('be.visible').then(($el)=>
        {
          if($el.length>0)
          {
            cy.log('Card Image is present.');

          }
          else{
            cy.log('Crad Image is not present.');
          }
        })
      cy.get('#premium_download').should('be.visible').then(($el)=>
        {
          if($el.length>0)
          {
            cy.log('Download option is present.');

          }
          else{
            cy.log('Download option is not present.');
          }
        })
      cy.get('#printTooltip').should('be.visible').then(($el)=>
        {
          if($el.length>0)
          {
            cy.log('Print icon is present.');

          }
          else{
            cy.log('Print icon is not present.');
          }
        })
      cy.contains('Edit Invitation').should('be.visible').then(($el)=>
        {
          if($el.length>0)
          {
            cy.log('Edit Invitation button is present.');

          }
          else{
            cy.log('Edit Invitation is not present.');
          }
        })
      cy.get('.brand-green').should('be.visible')
      cy.get('.bold').invoke('text').then((text)=>
      {
        cy.log('Invitation title:, ${text}')
        console.log('Invitation title:, text')
      })
      cy.contains('Hosted by ')
      cy.get('.host').invoke('text').then((text)=>
        {
          cy.log('Hosted By:, ${text}')
          console.log('Hosted By:, text')
        })
      cy.get('i.fa.fa-calendar').should('be.visible').then(($el)=>
        {
          if($el.length>0)
          {
            cy.log('Calendar icon is present.');

          }
          else{
            cy.log('CCalendar icon is not present.');
          }
        })
      cy.get('.sub-title-hr').invoke('text').then((text)=>
      {
        cy.log('Sub Title text:, ${text}')
        console.log('Sub Title text:, text')
      })
      cy.contains("Add to Calendar").should('be.visible').then(($el)=>
        {
          if($el.length>0)
          {
            cy.log('Add to calendar link is present.');

          }
          else{
            cy.log('Add to calendar link is not present.');
          }
        })
      cy.get('.sub-title-hr').invoke('text').then((text)=>
      {
        cy.log('Venue details:, ${text}')
        console.log('Venue details:, text')
      })
      cy.contains("Directions").should('be.visible')
      cy.get('a[href^="http://maps.apple.com"]').should('be.visible').then(($el)=>
        {
          if($el.length>0)
          {
            cy.log('Directions link is present.');

          }
          else{
            cy.log('Directions link is not present.');
          }
        })
      cy.get('#cancelEvent').should('be.visible')


    }
    validationoforGuestsCountinTracktab()
    {
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
cancelInvite()
      {
        cy.url().should('include', '/manage/')
        cy.get('#cancelEvent').click()
        cy.get('.sweet-alert h2').should('have.text', 'Cancel Event?');
        cy.get('.sweet-alert p').contains(
          'This action cannot be undone. A cancellation email will be sent to all guests!'
        );
        cy.get('.sweet-alert input[placeholder="Cancel reason"]').type('Event postponed due to weather');
        cy.get('.sweet-alert .confirm').click();
        // cy.get('input[type="text"]').type("Cancelling the event due to Heavy rains")
        // cy.get('.confirm').click()
      }
      cancelInvite0()
      {
        cy.url().should('include', '/manage/')
        cy.get('#cancelEvent').click()
        cy.get('.sweet-alert h2').should('have.text', 'Cancel Event?');
        cy.get('.sweet-alert p').contains(
          'This action cannot be undone. A cancellation email will be sent to all guests!'
        );
        cy.get('.sweet-alert .confirm').click();
        // cy.get('input[type="text"]').type("Cancelling the event due to Heavy rains")
        // cy.get('.confirm').click()
      }
}
 export default ManageTrack;