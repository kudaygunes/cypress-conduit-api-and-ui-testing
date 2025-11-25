/// <reference types="cypress" />

// Test: end to end test
// - Purpose: This test covers the complete lifecycle using direct API calls: login,
//   create a new article, verify it exists, delete it, and confirm it was removed.
// - Flow:
//   1. Log in using direct POST request to retrieve an access token
//   2. Create a new article using the access token
//   3. Verify the article is present by calling the articles list endpoint
//   4. Delete the article by its slug
//   5. Verify the article no longer appears in the list
it.only('end to end test', () => {
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

        cy.request({
            url: 'https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0',
            method: 'GET',
            headers: { 'Authorization': accessToken }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.articles[0].title).to.equal("Warhammer 40000 Horus Heresy")
            const slugId = response.body.articles[0].slug

            cy.request({
                url: `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
                method: 'DELETE',
                headers: { 'Authorization': accessToken }
            }).then(response => {
                expect(response.status).to.equal(204)
            })

            cy.request({
                url: 'https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0',
                method: 'GET',
                headers: { 'Authorization': accessToken }
            }).then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.articles[0].title).to.not.equal("Warhammer 40000 Horus Heresy")
            })
        })
    })
})