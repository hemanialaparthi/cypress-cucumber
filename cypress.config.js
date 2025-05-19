const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Enable Cucumber preprocessor
      on('file:preprocessor', cucumber());

      // Enable Mochawesome reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },
    specPattern: "cypress/e2e/Inytes/*.feature",  // ✅ Fix glob pattern
    reporter: 'cypress-mochawesome-reporter',     // ✅ Only one reporter
    reporterOptions: {
      reportDir: 'cypress/reports',      // Directory for reports
      overwrite: false,                  // Keep all reports
      html: true,                        // Generate HTML
      json: true                         // Generate JSON
    }
  }
});
