// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Custom command: loginToApplication
 * - Purpose: Log in via the Conduit API and set the JWT token in localStorage
 *   so that tests can simulate a logged-in user without going through the UI.
 * - Steps:
 *   1. Perform a POST to /api/users/login with test credentials
 *   2. Assert the response status is 200 and extract the token
 *   3. Wrap the token as an alias (`accessToken`) for downstream reuse
 *   4. Visit the root path while injecting the token into localStorage to
 *      bypass the login page and load the app as an authenticated user
 */
Cypress.Commands.add('loginToApplication', () => {
    cy.request({
        url: 'https://conduit-api.bondaracademy.com/api/users/login',
        method: 'POST',
        body: {
            "user": {
                "email": "sertmulayim@protonmail.com",
                "password": "Mulayim123"
            }
        }
    }).then(response => {
        expect(response.status).to.equal(200)
        const accessToken = response.body.user.token
        cy.wrap(accessToken).as('accessToken')
        cy.visit('/', {
            onBeforeLoad(win) {
                win.localStorage.setItem('jwtToken', accessToken)
            }
        })
    })
})
