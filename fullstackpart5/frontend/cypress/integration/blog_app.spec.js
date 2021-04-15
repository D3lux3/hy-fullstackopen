describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users', {
            username: 'testaaja', password: '1234'
        })
        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function () {
        cy.contains('log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('testaaja')
            cy.get('#password').type('1234')
            cy.get('#login-button').click()
            cy.contains('logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('testaaja')
            cy.get('#password').type('54e6456')
            cy.get('#login-button').click()
            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'testaaja', password: '1234' })
        })

        it('A blog can be created', function () {
            cy.contains('new blog')
                .click()
            cy.get('#title').type('insane in the brain')
            cy.get('#author').type('Cypress Hill')
            cy.get('#url').type('https://www.youtube.com/watch?v=RijB8wnJCN0')
            cy.get('#createBlogButton').click()
            cy.contains('insane in the brain Cypress Hill')
        })

        it('A blog can be liked', function () {
            cy.contains('new blog')
                .click()
            cy.get('#title').type('insane in the brain')
            cy.get('#author').type('Cypress Hill')
            cy.get('#url').type('https://www.youtube.com/watch?v=RijB8wnJCN0')
            cy.get('#createBlogButton').click()
            cy.contains('insane in the brain Cypress Hill')
            cy.get('#viewBlogButton').click()
            cy.get('#likeButton').click()

            cy.get('html').should('contain', 'likes 1')
        })

        it('A blog can be removed', function () {
            cy.contains('new blog')
                .click()
            cy.get('#title').type('insane in the brain')
            cy.get('#author').type('Cypress Hill')
            cy.get('#url').type('https://www.youtube.com/watch?v=RijB8wnJCN0')
            cy.get('#createBlogButton').click()
            cy.contains('insane in the brain Cypress Hill')
            cy.get('#viewBlogButton').click()


            cy.get('#removeBlogButton').click()
            cy.get('html').should('not.contain', 'Cypress Hill')
        })

        it('A blogs get sorted ', function () {
            cy.contains('new blog')
                .click()
            cy.get('#title').type('testiili1')
            cy.get('#author').type('testiili1')
            cy.get('#url').type('-')
            cy.get('#createBlogButton').click()

            cy.contains('new blog')
                .click()
            cy.get('#title').type('test2')
            cy.get('#author').type('test2')
            cy.get('#url').type('-')
            cy.get('#createBlogButton').click()


            cy.contains('new blog')
                .click()
            cy.get('#title').type('test3')
            cy.get('#author').type('test3')
            cy.get('#url').type('-')
            cy.get('#createBlogButton').click()


            cy.contains('test3')
                .contains('view')
                .click()
                .get('#likeButton')
                .click()
                .click()

           cy.get('.blog').first().contains('test3')
        })
    })

})