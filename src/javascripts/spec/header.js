describe('<Header />', () => {
  context('e2e', () => {
    it('toggle user', () => {
    	cy.visit('');
    	cy.get('ul li:first').click().should('have.class', 'open')
    });
  })
})
