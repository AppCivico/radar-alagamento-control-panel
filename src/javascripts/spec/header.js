describe('<Header />', () => {
  context('e2e', () => {
    it('toggle user', () => {
    	cy.visit('');
    	cy.get('.user-menu').click().should('have.class', 'open')
    });

    it('toggle sidebar', () => {
    	cy.visit('');
    	cy.get('.sidebar-toggle').click()
    	cy.get('body').should('have.class', 'sidebar-collapse')
    });
  })
})
