import React from 'react'
import chaiEnzyme from 'chai-enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme'
import { configure } from 'enzyme';

import Menu from '../app/containers/menu';

configure({ adapter: new Adapter() });

// HACK: chai-enzyme does not play nice with chai-jquery, so remove the
// problem-causing assertions that collide with chai-jquery
'visible hidden selected checked enabled disabled'.split(' ').forEach((selector) => {
  Object.defineProperty(chai.Assertion.prototype, selector, { get: () => {} })
})

chai.use(chaiEnzyme())

describe('Menu component', function(){
  context('<Menu />', function(){
    it('renders correctly', function(){
      const component = shallow(<Menu />)
      expect(component.find('span')).to.have.text('Notificações')
    });
  })
})
