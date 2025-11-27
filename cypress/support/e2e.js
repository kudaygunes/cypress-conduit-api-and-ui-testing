// ***********************************************************
// Support E2E Initialization File
// - This file is executed and loaded automatically before your test files.
// - Use it to register global commands, modify Cypress behavior, and
//   import third-party reporter helpers.
// - Examples: import custom `Cypress.Commands`, register global `cy.*`
//   helpers, add custom event listeners, or include test reporting hooks.
// - You can change the location of this file or turn off automatically
//   serving support files via the `supportFile` configuration option.
// - Learn more here: https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// Import custom Cypress commands (defined in commands.js). These commands
// include login helpers and additional test utilities used across tests.
import './commands'

// Register mochawesome reporter plugin hooks that create and enrich the
// HTML report with screenshots and attempt information. The plugin must be
// registered so screenshots and inline assets are saved properly.
import 'cypress-mochawesome-reporter/register';