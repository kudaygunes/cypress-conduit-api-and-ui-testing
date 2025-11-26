/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

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
    // Notes on usage and tokens:
    // - The `apiUrl` used for cy.request() calls is read from `Cypress.env('apiUrl')`.
    // - The Authorization header requires the 'Token ' prefix, e.g. 'Token <jwt>'.
    // - The UI login command (`cy.loginToApplication`) sets the raw token into
    //   localStorage (no 'Token ' prefix) so that navigating to the app simulates
    //   a logged-in user.
    const titleOfTheArticle = faker.person.fullName()
    cy.request({
        url: Cypress.env('apiUrl') + '/users/login',
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
            url: Cypress.env('apiUrl') + '/articles/',
            method: 'POST',
            body: {
                "article": {
                    "title": titleOfTheArticle,
                    "description": "The galaxy is burning",
                    "body": "In the grim darkness of the far future, there is only war.",
                    "tagList": ["war", "sci-fi"]
                }
            },
            headers: { 'Authorization': accessToken }
        }).then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.article.title).to.equal(titleOfTheArticle)
        })

        cy.request({
            url: Cypress.env('apiUrl') + '/articles?limit=10&offset=0',
            method: 'GET',
            headers: { 'Authorization': accessToken }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.articles[0].title).to.equal(titleOfTheArticle)
            const slugId = response.body.articles[0].slug

            cy.request({
                url: `${Cypress.env('apiUrl')}/articles/${slugId}`,
                method: 'DELETE',
                headers: { 'Authorization': accessToken }
            }).then(response => {
                expect(response.status).to.equal(204)
            })

            cy.request({
                url: Cypress.env('apiUrl') + '/articles?limit=10&offset=0',
                method: 'GET',
                headers: { 'Authorization': accessToken }
            }).then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.articles[0].title).to.not.equal(titleOfTheArticle)
            })
        })
    })
})