describe('Test our basic auth functions', () => {
	it('cannot login without username and password', () => {
		cy.visit('/login')
		cy.get('[data-cy=login-button]').click()
		cy.get('[data-cy=status-text]').should('contain', 'Incorrect')	
	})
	it('cannot login without password',()=>{
		cy.visit('/login')
		cy.get('[data-cy=email-input]').type('mike@mike.com')
		cy.get('[data-cy=login-button]').click()
		cy.get('[data-cy=status-text]').contains('Incorrect')
	})
	it('cannot login without username',()=>{
		cy.visit('/')
		cy.get('[data-cy=password-input]').type('123123')
		cy.get('[data-cy=login-button]').click()
		cy.get('[data-cy=status-text]').contains('Incorrect')
	})
})