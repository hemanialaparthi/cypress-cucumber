// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-iframe';
import 'cypress-xpath';
import 'cypress-real-events/support';

Cypress.Commands.add('mockReCaptcha', () => {
  // Intercept the POST request to the reCAPTCHA API
  cy.intercept('POST', 'https://www.google.com/recaptcha/enterprise/reload?k=6LfoaxwpAAAAAFLYxAbsxYM_t1ZnoM2qrv3KSTU2', {
    statusCode: 200,
    body: {
      success: true, // Simulate a successful reCAPTCHA verification
    },
  }).as('recaptcha'); // Alias for the intercepted request

  // Optionally, you can set some session storage data if needed
  cy.window().then((win) => {
    win.sessionStorage.setItem('recaptcha', JSON.stringify({
      success: true,
      timestamp: Date.now(),
    }));
  });
});
Cypress.Commands.add('login', (username, password) => {
  // const sessionId='Inytesdata.username';
  // const username1=Inytesdata.username;
  // const password1=Inytesdata.password;
  // console.log(username1)
  // console.log(password1)
    cy.session(
      username,
      () => {
        cy.visit('https://dev.inytes.com/')
        cy.get('[title=Login]').click({force:true})
        cy.get('[id=user_login]').type(username)
        cy.get('[id=user_password]').type(password)
        
        cy.get('#email-login').debug().should('be.visible').click({force:true})
        cy.wait(2000)
        
      },
    )
  })

  Cypress.Commands.add('checkValidation', (field, message) => {
    cy.get(field).should('be.visible').and('contain', message);
  });

/*Cypress.Commands.add('login', (username, password) => {
  
      cy.session(
        username,
        () => {
          cy.visit('https://dev.inytes.com/')
          cy.mockReCaptcha(); 
          cy.get('[title=Login]').click()
          cy.get('[id=user_login]').type(username)
          cy.get('[id=user_password]').type(password)
          
          cy.get('#email-login').debug().should('be.visible').click({force:true})
          
          cy.wait('@recaptcha').then((interception) => {
          console.log('Intercepted reCAPTCHA response:', interception)
          cy.wait(3000);
          
        })
      }
      )
    })
      */