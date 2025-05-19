Feature: Invitations

 Scenario: User should able to see all the cards
Given Inytes url
When Click on Create Invitation
Then Page should nagivate to Invitations page and view all cards.

Scenario: User should not able to create the Invitation before Login
Given Invitations page
When select a card and click on Personalize 
Then Page should nagivate to Login page

Scenario: User should able to Login
Given Login page
When valid credentails is provided
Then should able to Login