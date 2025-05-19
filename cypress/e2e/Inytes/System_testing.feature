Feature: System testing

Scenario: User should able to view all the Card details and icons at the left side of the Track tab.

 Given Update Invitation by selecting all the radio buttons
 When click on Manage
 Then Page should navigate to Track tab and verify all the functionality

Scenario: User should able to add guests after updating the invitation and verify the details in track tab.

 Given Update Invitation by selecting all the radio buttons and click on Manage.
 When Add Guests and click on Track tab
 Then Verify Guests details and count in the track tab
 
 
Scenario: User should able to add the guests for Non premium

Given Navigate to Add guests tab after creating the Invitation
When add 2 guests
Then Invitation should sent to the guests.
@focus
Scenario: Create Invitation, Add guests and navigate to track tab.

Given Create US address invitation.
When Add guests and navigate to track tab.
Then Capture all the details in Track tab.