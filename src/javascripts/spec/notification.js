import React from 'react'
import chaiEnzyme from 'chai-enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Notification from '../app/components/notification';

configure({ adapter: new Adapter() });

// HACK: chai-enzyme does not play nice with chai-jquery, so remove the
// problem-causing assertions that collide with chai-jquery
'visible hidden selected checked enabled disabled'.split(' ').forEach((selector) => {
  Object.defineProperty(chai.Assertion.prototype, selector, { get: () => {} })
})

chai.use(chaiEnzyme())

describe('<Notification />', () => {
  context('Unit Testing', () => {
    it('renders correctly', () => {
      const notification = {
      	date: "20172010",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet",
				id: 1,
				level: "info",
				title: "Lorem ipsum 1"
      }
      const component = shallow(<Notification notification=""/>);
      component.setProps({ notification });
      expect(component.find('.btn-group .btn-danger')).to.have.text('Criar notificação')
    });
	});

	context('e2e', () => {
    it('open modal', () => {
			cy.visit('/notifications');
			cy.get('.notification:first .btn-danger').click();
			cy.get('#alert').should('have.class', 'open')
		});
	});
})
