/// <reference types="cypress" />

// Test: login
// - Purpose: Stub API endpoints used on the landing/home page so tests run with
//   predictable data. Uses fixtures for `tags` and `articles` to avoid network
//   flakiness and to verify the application uses the provided fixture data.
// - Interceptions:
//   * `GET **/api/tags` => `cypress/fixtures/tags.json`
//   * `GET **/api/articles?limit=10&offset=0` => `cypress/fixtures/articles.json`
// - Action: Perform login using the project's `cy.loginToApplication()` custom
//   command so the app loads with the stubbed data.
it.only('login', () => {
    cy.intercept({method: 'GET', pathname: 'tags'}, {fixture: 'tags.json'})
    cy.intercept('GET', '**/api/articles?limit=10&offset=0', {fixture: 'articles.json'})
    cy.loginToApplication()
})

