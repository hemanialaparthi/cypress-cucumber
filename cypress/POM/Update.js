class UpdateCard
{
    NavigateToTrackTab()
    {

          cy.visit("https://dev.inytes.com")
        //Click on Profile
          cy.get("#menu-profile-pic").click()

        //Click on the Invitation from the list

        cy.get('.drop-menu').should('be.visible');

        cy.get('.menu-event-item').first().should('be.visible').click();
        cy.wait(6000)
        cy.get('body').then(($body) => {
          if ($body.find('div.row.row-full.upgrade-section').length > 0) {
            cy.get('#upgrade-section-close').should('be.visible'); // Optional: Verify it's visible
            cy.get('#upgrade-section-close').click({force:true}); // Click to close the popup
          }
        });
    }
    clickonEdit()
    {
        //Click on Edit Invitation
          cy.contains('button', 'Edit Invitation').click()
          cy.get('ul.dropdown').should('be.visible').contains("Edit Invitation").click()

    }
    EditAllDetailsinTrail(editTitle, editHostname, editPhone, editcohostName, editcohostEmail, editstartTime, editendTime, editVenue, editLocation, editmesg, editregionalmesg)
    {
         //assertion
         cy.url().should('include', '/edit-invitation/')

         //Click on Next
         cy.get("#nextDetails").click()

         cy.wait(10000)

         //Edit the title
         cy.get('#vTitle').clear().type(editTitle)

         //Edit Host name
         cy.get('#vHostName').clear().type(editHostname)

         //Edit Phone number
         cy.get('#vPhone').clear().type(editPhone)

         //Click on Add Cohost button
        //  cy.get("#addCohost").click()
        //Provide Cohost details
        //  cy.get("#vCoHostName").clear().type(editcohostName)
        //  cy.get("#vCoHostEmail").clear().type(editcohostEmail)

         //Edit the Date
         cy.get('#dDate').click()
         //click on next
         cy.get('.pika-next').click()
         cy.contains('15').click()

         //Edit Time
         cy.get('#vStartTime').clear().type(editstartTime).type('{enter}')
         // cy.get('.ui-timepicker-list').eq(1).scrollTo("bottom").contains(editstartTime).click()
         cy.get('#addEndTime').click()
         cy.get('#vEndTime').clear().type(editendTime).type('{enter}')
         // cy.get('.ui-timepicker-list').eq(2).scrollTo("bottom").contains(editendTime).click()

         //Edit Venue
         cy.get('#vLocationName').clear().type(editVenue)

         //Edit Full address
         cy.get('#vFA').clear().type(editLocation).wait(4000)
         cy.get('.pac-item').first().click()

       //Click on Next
       cy.get("#nextSettings").click()
       //Edit Regional Message
       cy.get('#addMessage').click({ force: true })
       cy.get('#tMessageieditor').clear().type(editmesg)      
       cy.get('#addLangMessage').click({ force: true })
       cy.get('#tOtherMessage').clear().type(editregionalmesg).type('{enter}')
       //Click on Save Card
       cy.get("#create-preview-card").click()

      //  //Click on Preview
      //  cy.get("#preview").click()

      //  cy.wait(3000)
      //  //Click on Close
      //  cy.get("#preview-close-trigger").should('be.visible').click({force:true})
      //  //Click on Manage
      //  cy.get("#create-wrap").contains("Manage").click()

      //  //assertion
      //  cy.url().should('include', '/manage/')
    }
    
    upgradeInvitation(cardNo, expirydate, CVV)
    {
      //Upgrade Invitation
    

     cy.get('#unpaid_link').should('be.visible').click()
     cy.get('.plan').invoke('text').then((currency) => {
      if (currency.includes('₹')) {
        cy.get('input[name="paymentMethod"][value="phonepe"]').should('be.checked')
        cy.get('input[name="paymentMethod"][value="stripe"]').should('not.be.checked');
        cy.log('Currency is INR - Payment method is Phone Pay.');
        cy.get('#orderNowButton').click();
        cy.wait(3000)
        cy.origin('https://mercury-uat.phonepe.com', () => {
          cy.url().should('include', 'https://mercury-uat.phonepe.com/transact/simulator?');
        });

      } else if (currency.includes('$')) {
        cy.get('img[alt="Feature image"]')
        .should('have.attr', 'src', 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg');
        cy.log('Currency is USD - Payment menthod is Stripe.');

        cy.get('#PremiumPaymentLink').should('be.visible').click()

       

        cy.get('.stripe_checkout_app').then(($iframe) => {
      // Access the content document of the iframe
      const outerdoc = $iframe.contents()
      cy.wait(4000)
      cy.get('iframe').should('be.visible').then(($iframe) => {
      const body = $iframe.contents().find('body');

      // cy.wrap(outerdoc.find('iframe')).should('exist').eq(0).then($innerIframe=>{
      //   const innerDoc = $innerIframe.contents();
        cy.wrap(body).find('input#card_number', { timeout: 5000 }).should('be.visible').type(cardNo);
      cy.wrap(body).find('input#cc-exp', { timeout: 5000 }).should('be.visible').type(expirydate);
      cy.wrap(body).find('input#cc-csc', { timeout: 5000 }).should('be.visible').type(CVV);
      cy.wrap(body).find('button#submitButton', { timeout: 5000 }).should('be.visible').should('not.be.disabled').click({force:true});
      })
      
        })
      } 
    });   
   }

    providecohostdetails(cohostName, cohostEmail)
    {

      //assertion
      cy.url().should('include', '/edit-invitation/')

      //Click on Next
      cy.get("#nextDetails").click()
      cy.wait(10000)
        //Click on Add Cohost button
         cy.get("#cohostrow #addCohost").click({force:true})
        //Provide Cohost details
         cy.get("#vCoHostName").type(cohostName)
         cy.get("#vCoHostEmail").type(cohostEmail)
         //Click on Next
       cy.get("#nextSettings").click()
       //Click on Save Card
       cy.get("#create-preview-card").click()


    }

    ClickAddManually()
    {
      cy.url().should('include', '/edit-invitation/')

      //Click on Next
      cy.get("#nextDetails").click()
      cy.wait(10000)
      cy.get('#manual_addr_tab').click() 
      cy.wait(1000)
      cy.on('window:alert', (text) => {
        expect(text).to.equal('The unsaved address information will be lost. Please confirm. '); // Validate alert text
      });
      
      cy.get('.confirm').click({force:true});
    }

    EditInviteManually(address, city, state, zip, liveurl)
   {
     cy.url().should('include', '/edit-invitation/')

    //Click on Next
      cy.get("#nextDetails").click()
      cy.wait(10000)
      cy.get('#manual_addr_tab').click() 
      cy.wait(1000)
      cy.on('window:alert', (text) => {
        expect(text).to.equal('The unsaved address information will be lost. Please confirm. '); // Validate alert text
      });
      
      cy.get('.confirm').click({force:true});
      //Click on Add Address Manually
      cy.get('#street').type(address)
      cy.get('#city').type(city)
      cy.get('#state').type(state)
      cy.get('#zip').type(zip)
      cy.get('#live_location').type(liveurl)
      cy.get('#nextSettings').click()
      cy.get('#create-preview-card').click()
      cy.wait(3000)
      
   }

   EditInviteLocateAddress(editLocation)
   {
     cy.url().should('include', '/edit-invitation/')

    //Click on Next
      cy.get("#nextDetails").click()
      cy.wait(10000)
      cy.get('#locate_map_addr').click() 
      cy.wait(1000)
      cy.on('window:alert', (text) => {
        expect(text).to.equal('The unsaved address information will be lost. Please confirm. '); // Validate alert text
      });
      
      cy.get('.confirm').click({force:true});
      //Click on Add Address Manually
      cy.get('#vFA').clear().type(editLocation).wait(4000)
      cy.get('.pac-item').first().click()
      cy.get('#nextSettings').click()
      cy.get('#create-preview-card').click()
      cy.wait(3000)
      
   }
   EditInviteManuallyBlank()
   {
    cy.url().should('include', '/edit-invitation/')

    //Click on Next
      cy.get("#nextDetails").click()
      cy.wait(10000)
      cy.get('#manual_addr_tab').click() 
      cy.wait(1000)
      cy.on('window:alert', (text) => {
        expect(text).to.equal('The unsaved address information will be lost. Please confirm. '); // Validate alert text
      });
      
      cy.get('.confirm').click({force:true});
      cy.get('#nextSettings').click()
      cy.get('#create-preview-card').click()
      cy.wait(3000)
      

   }

   EditInviteManuallyclear()
   {
    cy.url().should('include', '/edit-invitation/')

    //Click on Next
      cy.get("#nextDetails").click()
      cy.wait(10000)
      cy.get('#manual_addr_tab').click() 
      cy.wait(1000)
      cy.get('#street').clear()
      cy.get('#city').clear()
      cy.get('#state').clear()
      cy.get('#zip').clear()
      cy.get('#live_location').clear()
      cy.get('#nextSettings').click()
      cy.get('#create-preview-card').click()
      cy.wait(3000)
   }

   selectAllradiobuttons()
   {
      cy.url().should('include', '/edit-invitation/')
      cy.get('#nextDetails').click()
      cy.wait(10000)
      cy.get('#eNotifyCustomer').then(($radio)=>
        {
          if(!$radio.is(':checked'))
          {
            cy.get('#eNotifyCustomer').click({force:true})
          }
        })
        cy.get('#iDisableRSVP').then(($radio)=>
          {
            if(!$radio.is(':checked'))
            {
              cy.get('#iDisableRSVP').click({force:true})
            }
          })
        cy.get('#eFood').then(($radio)=>
           {
              if(!$radio.is(':checked'))
              {
                cy.get('#eFood').click({force:true})
              }
            })
         cy.get('#eHideList').then(($radio)=>
          {
             if(!$radio.is(':checked'))
                 {
                   cy.get('#eHideList').click({force:true})
                 }
          })
          cy.get('#eAllowLinkReply').then(($radio)=>
            {
               if(!$radio.is(':checked'))
                   {
                     cy.get('#eAllowLinkReply').click({force:true})
                   }
            })
           cy.get('#bSendGift_value').then(($radio)=>
              {
                 if(!$radio.is(':checked'))
                     {
                       cy.get('#bSendGift_value').click({force:true})
                     }
              })
            cy.get('#iCaptureGuestsPhone').then(($radio)=>
                {
                   if(!$radio.is(':checked'))
                       {
                         cy.get('#iCaptureGuestsPhone').click({force:true})
                       }
                })
            cy.get('#guestClassifyinput').then(($radio)=>
                {
                    if(!$radio.is(':checked'))
                        {
                           cy.get('#guestClassifyinput').click({force:true})
                           cy.get('#iadultOnly').click({force:true})
                        }
                })
      
      cy.get('#create-preview-card').click({force:true})
      cy.wait(3000)

   }

   unselectAllradiobuttons()
   {
      cy.url().should('include', '/edit-invitation/')
      cy.get('#nextDetails').click()
      cy.wait(10000)
      cy.get('#nextSettings').click()
      cy.get('#eNotifyCustomer').then(($radio)=>
      {
        if($radio.is(':checked'))
        {
          cy.get('#eNotifyCustomer').click({force:true})
        }
      })
      cy.get('#iDisableRSVP').then(($radio)=>
        {
          if($radio.is(':checked'))
          {
            cy.get('#iDisableRSVP').click({force:true})
          }
        })
      cy.get('#eFood').then(($radio)=>
         {
            if($radio.is(':checked'))
            {
              cy.get('#eFood').click({force:true})
            }
          })
       cy.get('#eHideList').then(($radio)=>
        {
           if($radio.is(':checked'))
               {
                 cy.get('#eHideList').click({force:true})
               }
        })
        cy.get('#eAllowLinkReply').then(($radio)=>
          {
             if($radio.is(':checked'))
                 {
                   cy.get('#eAllowLinkReply').click({force:true})
                 }
          })
         cy.get('#bSendGift_value').then(($radio)=>
            {
               if($radio.is(':checked'))
                   {
                     cy.get('#bSendGift_value').click({force:true})
                   }
            })
          cy.get('#iCaptureGuestsPhone').then(($radio)=>
              {
                 if($radio.is(':checked'))
                     {
                       cy.get('#iCaptureGuestsPhone').click({force:true})
                     }
              })
          cy.get('#guestClassifyinput').then(($radio)=>
              {
                  if($radio.is(':checked'))
                      {
                         cy.get('#guestClassifyinput').click({force:true})
                      }
              })

      cy.get('#create-preview-card').click()
      cy.wait(3000)
   }
    Manage()
    {
      cy.xpath('//div[@id="create-wrap"]//ul//li[5]', { multiple: true }).first().click()
      cy.url().should('include', '/manage/')
      cy.get('body').then(($body) => {
          if ($body.find('div.row.row-full.upgrade-section').length > 0) {
            cy.get('#upgrade-section-close').should('be.visible'); // Optional: Verify it's visible
            cy.get('#upgrade-section-close').click({force:true}); // Click to close the popup
          }
        });
    }     
          

         
    
}

export default UpdateCard;
