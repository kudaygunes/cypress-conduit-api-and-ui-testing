/// <reference types="cypress" />

// Test Suite: Sign Up Page - Negative Scenarios
// - Purpose: Verify client-side validation on the sign up page for invalid
//   or edge-case usernames. This suite contains a set of negative scenarios
//   which ensure the UI shows the correct validation messages for usernames
//   that are too short or too long and accepts usernames within the allowed
//   length range.
// - Data-driven: `testData` contains multiple username strings with the
//   expected validation outcome. Each case is executed as a separate `it` test.
const testData = [
    { username: '12', errorMessage: 'username is too short (minimum is 3 characters)', errorIsDisplayed: true },
    { username: '123', errorMessage: 'username', errorIsDisplayed: false },
    { username: '01234567890123456789', errorMessage: 'username', errorIsDisplayed: false },
    { username: '012345678901234567891', errorMessage: 'username is too long (maximum is 20 characters)', errorIsDisplayed: true }
]

testData.forEach(data => {
    // Each iteration runs a single test case for the username in `data`.
    // We leave the `it.only` so you can run single cases during development —
    // remove the `.only` to run the full suite.
    it.only(`${data.username}`, () => {
        cy.visit('/')
        cy.contains('Sign up').click()
        cy.get('[placeholder="Username"]').type(data.username)
        cy.get('[placeholder="Email"]').type('12')
        cy.get('[placeholder="Password"]').type('12')
        cy.contains('button', 'Sign up').click()
        // Assertion:
        // - If the test expects an error, assert the `.error-messages` element
        //   contains the expected message text.
        // - If there should be no error, verify the `.error-messages` does not
        //   contain the expected message text.
        if(data.errorIsDisplayed){
            cy.get('.error-messages').should('contain.text', data.errorMessage)
        }
        else {
            cy.get('.error-messages').should('not.contain.text', data.errorMessage)
        }
        
    })
})
