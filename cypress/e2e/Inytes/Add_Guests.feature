Feature: Add Guests in Add Guest tab

Scenario: User should able to navigate to Add Guest tab page.

Given user selects the 1st card from the profile
When click on Add Guest tab
Then Page should navigate to Invite tab


Scenario: Send invite to 2 Guests for Non premium Cards.

Given Navigate to Add Guests tab
When Provide 2 Guest emails and click on Send Invitation
Then Invitation should be send to the guests