import React from 'react'
import chaiEnzyme from 'chai-enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Alert from '../app/components/alert';

configure({ adapter: new Adapter() });

// HACK: chai-enzyme does not play nice with chai-jquery, so remove the
// problem-causing assertions that collide with chai-jquery
'visible hidden selected checked enabled disabled'.split(' ').forEach((selector) => {
  Object.defineProperty(chai.Assertion.prototype, selector, { get: () => {} })
})

chai.use(chaiEnzyme())

describe('<Alert />', () => {
  context('Unit Testing', () => {
    it('renders correctly', () => {
      const component = shallow(<Alert />)
      expect(component.find('.modal-title')).to.have.text('Criar alerta')
    });

    it('show message if Alert are empty', () => {
    	const component = shallow(<Alert />);
      if (component.props().isOpen) {
      	expect(component.find('#alert')).to.have.class('open')
      }
    });
	});

	context('e2e', () => {
    it('closes modal', () => {
			cy.visit('/notifications');
			cy.get('.notification:first .btn-danger').click();
			cy.get('.close').click();
			cy.get('#alert').should('not.have.class', 'open')
		});
	});
})
