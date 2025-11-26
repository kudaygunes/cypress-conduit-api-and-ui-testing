/// <reference types="cypress" />
// Test: apiModification
// - Purpose: Intercept the network request that fetches the article list and
//   modify the response so the first article's `favoritesCount` is extremely
//   large. This lets us verify the UI correctly reads and displays the
//   modified value coming from the API.
// - Interception: Matches GET requests to the articles endpoint and modifies
//   `res.body.articles[0].favoritesCount` before the response is delivered to
//   the application.
// - Assertion: After logging in, the first `app-favorite-button` should show
//   the modified favorites count value.
it.only('apiModification', {retries: 2}, () => {
    cy.intercept('GET', '**/api/articles?limit=10&offset=0', req =>{
        req.continue(res => {
            res.body.articles[0].favoritesCount = 9999999
            res.send(res.body)
        })
    })
    cy.loginToApplication()
    cy.get('app-favorite-button').first().should('contain.text', '9999999')
})