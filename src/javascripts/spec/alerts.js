import React from 'react'
import chaiEnzyme from 'chai-enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Alerts from '../app/containers/alerts';

configure({ adapter: new Adapter() });

// HACK: chai-enzyme does not play nice with chai-jquery, so remove the
// problem-causing assertions that collide with chai-jquery
'visible hidden selected checked enabled disabled'.split(' ').forEach((selector) => {
  Object.defineProperty(chai.Assertion.prototype, selector, { get: () => {} })
})

chai.use(chaiEnzyme())

describe('<Alerts />', () => {
  context('Unit Testing', () => {
    it('renders correctly', () => {
      const component = shallow(<Alerts />)
      expect(component.find('.box-title')).to.have.text('Alertas')
    });

    it('show message if alerts are empty', () => {
    	const component = shallow(<Alerts />);
      if (component.state().alerts.length < 1) {
      	expect(component.find('.callout-info p')).to.have.text('Nenhum alerta localizado')
      }
    });
	});
})
