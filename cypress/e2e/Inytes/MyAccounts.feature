Feature: My Accounts

Scenario: Capture all the card details in the Invitations tab

When navigated to Invitaions tab
Then capture all the card details
@focus
Scenario: Swap the premium invitation

Given navigated to Invitaions tab
When perform swap application
Then Invitation need to be swaped