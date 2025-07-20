# Cypress-Cucumber Test Automation Framework

This project contains automated tests for the Inytes application using Cypress with Cucumber.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Writing New Tests](#-writing-new-tests)
- [Key Features](#-key-features)

## 🎯 Project Overview

This framework tests the Inytes application functionality including:

- User Login and Authentication
- Invitation Creation and Management
- Guest Management
- Account Profile Management
- Event Tracking

## 🔧 Prerequisites

Before setting up this project, ensure you have:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

## 🚀 Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Cypress-Cucumber
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Verify Cypress installation:**

   ```bash
   npx cypress verify
   ```

## 📁 Project Structure

```txt
Cypress-Cucumber/
├── cypress/
│   ├── e2e/
│   │   ├── Inytes/                    # Test files
│   │   │   ├── *.feature             # Gherkin feature files
│   │   │   └── *.cy.js               # Step definitions
│   │   ├── CreateInvitation1.cy.js   # Additional test files
│   │   └── Login.cy.js
│   ├── fixtures/                     # Test data
│   │   ├── testdata.json
│   │   └── test-image.png
│   ├── POM/                          # Page Object Model classes
│   │   ├── Login.js
│   │   ├── Create.js
│   │   ├── AddGuests.js
│   │   └── *.js
│   ├── reports/                      # Generated test reports
│   ├── screenshots/                  # Test failure screenshots
│   └── support/                      # Support files
│       ├── commands.js               # Custom commands
│       └── e2e.js                    # Global configurations
├── cypress.config.js                 # Cypress configuration
└── package.json                      # Project dependencies
```

### ⚠️ Important: Test Dependencies

**Some tests have dependencies and must be run in a specific order:**

- **Create Invitation → Add Guests**: You must first create an RSVP invitation using the "Create Invitation" test before running "Add Guests" tests. If you try to add guests without an existing RSVP invitation, the test will fail because there's no invitation available for RSVP.

- **Sequential Test Execution**: When running related test suites, ensure they follow the logical flow of the application (Create → Manage → Update).

### Run Tests with Interactive UI

```bash
npx cypress open
```

### Recommended Test Execution Order

For best results, run tests in this sequence:

1. Login tests
2. Create Invitation tests (ensure RSVP invitation is created)
3. Add Guests tests
4. Manage/Update Invitation tests
5. Track Tab tests

## ✍️ Writing New Tests

To add new tests, follow these steps:

### 1. Create a Feature File

Create a new `.feature` file in `cypress/e2e/Inytes/`:

```gherkin
Feature: Feature Name

Scenario: Scenario Description
  Given I am on the login page
  When I enter valid credentials
  Then I should be logged in successfully
```

### 2. Create Step Definitions

```javascript
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am on the login page', () => {
  cy.visit('/login');
});

When('I enter valid credentials', () => {
Create a corresponding `.cy.js` file with the same name:

```javascript
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am on the login page', () => {
  cy.visit('/login');
});

When('I enter valid credentials', () => {
  cy.get('#username').type('testuser');
  cy.get('#password').type('password');
  cy.get('#login-button').click();
});

Then('I should be logged in successfully', () => {
  cy.url().should('include', '/dashboard');
});
```

### 3. Use Page Object Model

Create reusable page objects in the `cypress/POM/` directory:

```javascript
class LoginPage {
  login(username, password) {
    cy.get('#user_login').type(username);
    cy.get('#user_password').type(password);
    cy.get('#email-login').click({force: true});
  }
}

export default LoginPage;
```

## 🔑 Key Features

### Test Data Management

- Store test data in `cypress/fixtures/testdata.json`
- Use `cy.fixture()` to load data in tests

### Custom Commands

- Defined in `cypress/support/commands.js`
- Reusable actions across tests

### Screenshot on Failure

- Automatic screenshots saved in `cypress/screenshots/`

## 📝 Test Categories

Current test suites include:

1. **Account Profile Management** - User profile operations
2. **Add Guests** - Guest invitation functionality
3. **Create Invitation** - Event invitation creation
4. **Invitation Management** - Invitation lifecycle
5. **My Accounts** - Account dashboard features
6. **System Testing** - End-to-end system tests
7. **Track Tab** - Event tracking features
8. **Update Invitation** - Invitation modification

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing to start:**
   - Ensure all dependencies are installed: `npm install`
   - Verify Cypress: `npx cypress verify`

2. **Feature files not detected:**
   - Check `cypress.config.js` specPattern configuration
   - Ensure `.feature` files are in the correct directory

3. **Step definitions not found:**
   - Verify step definitions file names match feature file names
   - Check cucumber preprocessor configuration in `package.json`

4. **"Add Guests" test failing:**
   - **Most common cause**: No RSVP invitation exists
   - **Solution**: Run "Create Invitation" test first to create an RSVP invitation
   - **Why**: The Add Guests functionality requires an existing invitation that allows RSVP

5. **Test dependencies not met:**
   - **Problem**: Tests fail because required data doesn't exist
   - **Solution**: Follow the recommended test execution order
   - **Example**: Create → Manage → Update sequence
