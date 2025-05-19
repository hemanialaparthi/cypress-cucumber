Feature: Update Invitation

Scenario: Navigate to Manage track tab page after clicking on the latest card from the profile
# Given Login into the application
When user selects the 1st card from the profile
Then page should navigate to the Manage Invitation page.

Scenario: Update the Invitation by providing Cohost details

When Navigated to Edit Invitation 
Then Cohost details are provided and click on Save Card

Scenario: Update the Invitation by editing all details

When Navigated to Edit Invitation 
Then Edit all the details in the Edit Invitation

Scenario: Update the Invitation by editing Location from Locate Address to Manual

When Navigated to Edit Invitation 
Then Edit the location from Locate address to Manual address.


Scenario: Update the Invitation by editing Location from Manual to Locate address

When Navigated to Edit Invitation 
Then Edit the location from manual address to locate address.

Scenario: User should not able to Update the Invitation when data is not given in all the manual fields

Given Navigated to Edit Invitation 
When Click on Manual address and leave all the fields blank and save the card.
Then an alert message and validation messages should display.


Scenario: User should not able to Update the Invitation when data is cleared from all the manual fields

Given Navigated to Edit Invitation 
When Click on Manual address and clear data in all the fields.
Then an alert message and validation messages should display.

Scenario: User should able to receive an alert message when trying to update the address from locate to add manually

Given Navigated to Edit Invitation 
When Click on Add Manually
Then Alert popup should appear


Scenario: User should able to upgrade the Invitation to premium

Given Navigate to Manage Invitation page of the 1st card
When click on Upgarde and upgrade to premium
Then Invitation need to be upgraded


Scenario: Update the Invitation by selecting all the radio buttons

When Navigated to Edit Invitation
Then update the Invitation by selecting all the radio buttons

Scenario: Update the Invitation by unselecting the default radio buttons when all the radio buttons are selected.

When Navigated to Edit Invitation
Then update the Invitation by unselecting all the radio buttons