describe('Test assigning of boat', () => {
    it('adds a brand new boat', () => {
		// cy.request('POST', 'https://capstones37.herokuapp.com/auth/login', {
        //     "email": "mike@mike.com",
        //     "password": "123456"
        // })
        cy.clearLocalStorage()
        cy.visit('/login')
        cy.wait(2000)
		cy.get('[data-cy=email-input]').type('mike@mike.com')
		cy.get('[data-cy=password-input]').type('123456')
		cy.get('[data-cy=login-button]').click()
		cy.wait(2000)
        cy.visit('/assign')
        cy.wait(500)
        cy.get('[data-cy=add]').click()
        cy.get('[data-cy=boatId]').type('testingtesting')
        cy.get('[data-cy=locationSelect]').parent()
        .click()
        .get('ul > li[data-value="Bedok"]')
        .click();
        cy.get('[data-cy=serial]').type('wegwegwe')
        cy.get('[data-cy=submitBoat]').click()
        cy.wait(3000)
        cy.contains('testingtesting')
	})
})