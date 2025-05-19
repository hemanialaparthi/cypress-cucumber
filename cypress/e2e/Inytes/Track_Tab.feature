Feature: Add Guests in Add Guest tab

Scenario: Navigate to track tab and validate the data for Non Premium

When user selects the 1st card from the profile
Then page should navigate to the Manage Invitation page and view the data.

Scenario: User should able to view the sent guests list after sending the invite for Non Premium

Given Provide 2 Guest emails and click on Send Invitation after navigating to Add Guests tab
When Click on Track tab
Then Guests list should display.

Scenario: User should able to edit the guest response in track tab

When user updates the rsvp in track tab
Then count of the guests need to be updated.

Scenario: User should not able to perform any actions in the Track for NON Premium cards

 When Navigate to Manage track tab after creating the Invitation.
 Then Copy link, QR Code, Download, Print should not able to perform.

Scenario: User should able to cancel the invitation after creating invite.

 Given Navigate to Manage track tab after creating the Invitation.
 When cancel the Invitation
 Then Invitation need to be cancelled.

Scenario: User should able to cancel the invitation from Track tab.

 Given Navigate to Manage track tab.
 When cancel the Invitation
 Then Invitation need to be cancelled.


Scenario: User should not able to cancel the invitation without reason.

 Given Navigate to Manage track tab.
 When click on Cancel button
 Then Validation message need to display.

 @focus
Scenario: User should able to cancel the invitation after validation occurs.

 Given Navigate to Manage track tab and click on cancel button.
 When enter the reason and click on cancel
 Then Invitation need to be cancelled.