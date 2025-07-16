Feature: Account Profile Management

@focus
Scenario: User should able to view profile information in My Account
 When User navigates to My Account page
 Then User should see all profile information fields

@focus
Scenario: User should able to edit and save profile information
 When User navigates to My Account page
 And User updates profile information
 Then Changes should be saved successfully

@focus
Scenario: User should see delete account confirmation popup
 When User navigates to My Account page
 And User clicks on Delete your account option
 Then Delete account confirmation popup should appear
 And User cancels the deletion

Scenario: User should be able to completely delete their account
 When User creates a disposable test account
 And User navigates to My Account page with disposable account
 And User clicks on Delete your account option
 And User confirms account deletion in the popup
 Then Account should be completely deleted from the system