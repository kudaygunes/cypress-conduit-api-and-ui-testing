/// <reference types="cypress" />

// Test: delete article
// - Purpose: Create a new article via API, then verify it can be deleted via the UI.
// - Setup:
//   1. Make a POST request to login and get an access token
//   2. Use the token to create a new article with title 'Warhammer 40000 Horus Heresy'
//   3. Verify the article was created (201 status and title matches)
// - User Flow:
//   1. Log in via the UI
//   2. Click on the newly created article
//   3. Click the 'Delete Article' button
//   4. Wait for the articles list to refresh
//   5. Verify the deleted article no longer appears in the list
it.only('delete article', () => {
    // Step 1: Login via direct HTTP request to get authorization token
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
        const accessToken = 'Token ' + response.body.user.token
        // Step 2: Create a test article with the authorized token
        cy.request({
            url: 'https://conduit-api.bondaracademy.com/api/articles/',
            method: 'POST',
            body: {
                "article": {
                    "title": "Warhammer 40000 Horus Heresy",
                    "description": "The galaxy is burning",
                    "body": "In the grim darkness of the far future, there is only war.",
                    "tagList": ["war", "sci-fi"]
                }
            },
            headers: { 'Authorization': accessToken }
        }).then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.article.title).to.equal("Warhammer 40000 Horus Heresy")
        })
    })

    // Step 3: Log in via UI and navigate to the article
    cy.loginToApplication()
    cy.contains('Warhammer 40000 Horus Heresy').click()
    // Step 4: Intercept the articles list refresh and click delete
    cy.intercept('GET', '**/api/articles?limit=10&offset=0').as('articleApiCall')
    cy.contains('button', 'Delete Article').first().click()
    // Step 5: Wait for the articles list to refresh after deletion
    cy.wait('@articleApiCall')
    // Step 6: Verify the deleted article no longer appears in the list
    cy.get('app-article-list').should('not.contain.text', 'Warhammer 40000 Horus Heresy')
})