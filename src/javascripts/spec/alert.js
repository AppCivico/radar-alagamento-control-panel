/* eslint-disable import/no-extraneous-dependencies, getter-return */
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Alert from '../app/components/alert';

configure({ adapter: new Adapter() });

// HACK: chai-enzyme does not play nice with chai-jquery, so remove the
// problem-causing assertions that collide with chai-jquery
'visible hidden selected checked enabled disabled'.split(' ').forEach((selector) => {
	Object.defineProperty(chai.Assertion.prototype, selector, { get: () => {} });
});

chai.use(chaiEnzyme());

describe('<Alert />', () => {
	context('Unit Testing', () => {
		it('renders correctly', () => {
			const alert = {
				source: {
					created_at: '2017-11-24 20:43:10.664712',
					name: 'SAISP',
					id: 1,
				},
				source_id: 1,
				location: '{"type":"Point","coordinates":[-46.7792928,-23.5732336]}',
				name: '1000946',
				description: 'Córrego Itaim  - Rua Joaquim L. Veiga',
				created_at: '2017-11-24 20:43:10.67918',
				id: 1,
				type: '0 PLU(mm)',
			};
			const component = shallow(<Alert alert={alert} />);
			component.setProps({ alert });
			expect(component.find('.btn-group .btn-danger')).to.have.text('Criar notificação');
		});
	});

	context('e2e', () => {
		it('open modal', () => {
			cy.visit('/alerts');
			cy.get('body').then(($body) => {
				if ($body.find('.alert:first .btn-danger').length) {
					cy.get('.alert:first .btn-danger').click();
					cy.get('#notification').should('have.class', 'open');
				}
			});
		});
	});
});
