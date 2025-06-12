Feature: Account Profile Management

Scenario: User should able to view profile information in My Account

 When User navigates to My Account page
 Then User should see all profile information fields

Scenario: User should able to edit and save profile information

 When User navigates to My Account page
 And User updates profile information
 Then Changes should be saved successfully

Scenario: User should able to change password successfully

 When User navigates to My Account page
 And User updates password information
 Then Password should be updated successfully

Scenario: User should not be able to save profile with invalid information

 When User navigates to My Account page
 And User enters invalid profile information
 Then Validation error messages should be displayed