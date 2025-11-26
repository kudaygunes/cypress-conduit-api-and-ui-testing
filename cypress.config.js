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

  e2e: {
    // baseUrl is the web app root; tests that use cy.visit('/') will load this URL.
    baseUrl: 'https://conduit.bondaracademy.com',
    setupNodeEvents(on, config) {
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
