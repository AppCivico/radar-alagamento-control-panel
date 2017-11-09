import React from 'react'
import chaiEnzyme from 'chai-enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Notifications from '../app/containers/notifications';

configure({ adapter: new Adapter() });

// HACK: chai-enzyme does not play nice with chai-jquery, so remove the
// problem-causing assertions that collide with chai-jquery
'visible hidden selected checked enabled disabled'.split(' ').forEach((selector) => {
  Object.defineProperty(chai.Assertion.prototype, selector, { get: () => {} })
})

chai.use(chaiEnzyme())

describe('<Notifications />', () => {
  context('Unit Testing', () => {
    it('renders correctly', () => {
      const component = shallow(<Notifications />)
      expect(component.find('.box-title')).to.have.text('Notificações')
    });

    it('show message if notifications are empty', () => {
    	const component = shallow(<Notifications />);
      if (component.state().notifications.length < 1) {
      	expect(component.find('.callout-info p')).to.have.text('Nenhuma notificação localizada')
      }
    });
	});
})
