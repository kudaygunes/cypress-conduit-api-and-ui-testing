const { defineConfig } = require("cypress");

// Project-level configuration for Cypress.
// Note: This file declares some default environment variables used throughout
// the tests below (`username`, `password`, `apiUrl`). For CI or team usage,
// prefer storing secrets outside source control and override these values via
// `cypress.env.json`, command-line `--env` flags, or CI secrets.
module.exports = defineConfig({
  env: {
    // Default credentials and API URL: these can be overridden per-environment.
    username: 'sertmulayim@protonmail.com',
    password: 'Mulayim123',
    // `apiUrl` points to the API server (used for cy.request calls). It should
    // not include a trailing slash since tests concatenate paths like '/users/login'.
    apiUrl: 'https://conduit-api.bondaracademy.com/api'
  },

  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },

  // Reporter configuration
  // - `cypress-multi-reporters` allows using more than one Mocha reporter
  //   simultaneously (e.g., mocha-junit-reporter for JUnit XML and
  //   cypress-mochawesome-reporter for HTML reports).
  // - `reporter-config.json` contains reporter-specific options such as
  //   output file paths and embedded screenshots.

  e2e: {
    // baseUrl is the web app root; tests that use cy.visit('/') will load this URL.
    baseUrl: 'https://conduit.bondaracademy.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },

    retries: {
      openMode: 0,
      runMode: 1
    }
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});
