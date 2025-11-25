/// <reference types="cypress" />

// Test: waiting for apis
// - Purpose: Intercept the articles API call and wait for it to complete, then verify
//   the response contains expected data before checking the UI.
// - Alias: Register the GET articles request as '@articleApiCall' so we can wait for it.
// - Flow:
//   1. Intercept and alias the articles endpoint
//   2. Log in (which triggers the intercepted articles call)
//   3. Wait for the API call and validate the response body contains 'Bondar Academy'
//   4. Verify the UI also renders the article text correctly
it.only('waiting for apis', () => {
    cy.intercept('GET', '**/api/articles?limit=10&offset=0').as('articleApiCall')
    cy.loginToApplication()
    cy.wait('@articleApiCall').then(apiArticleObject => {
        console.log(apiArticleObject)
        expect(apiArticleObject.response.body.articles[0].title).to.contain('Bondar Academy')
    })
    cy.get('app-article-list').should('contain.text', 'Bondar Academy')
    // Verify the article text appears in the DOM by extracting all text content
    cy.get('app-article-list').invoke('text').then(allArticleTexts => {
        expect(allArticleTexts).to.contain('Bondar Academy')
    })
})