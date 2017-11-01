import React from 'react'
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme'

import Menu from '../app/containers/menu';

// HACK: chai-enzyme does not play nice with chai-jquery, so remove the
// problem-causing assertions that collide with chai-jquery
'visible hidden selected checked enabled disabled'.split(' ').forEach((selector) => {
  Object.defineProperty(chai.Assertion.prototype, selector, { get: () => {} })
})

// Cypress automatically exposes the 'chai'
// global to all spec files. This enables us
// to extend chai with enzyme specific assertions
// for this one spec file.
//
// Alternatively we could move this configuration
// into cypress/support/assertions to enable all
// spec files to use these chai-enzyme assertions
chai.use(chaiEnzyme())

describe('Unit Test React with Enzyme', function(){
  context('<Menu />', function(){
    it('displays default greeting', function(){
      const component = shallow(<Menu />)
      expect(component.find('span')).to.have.text('Notificações')
    });
  })
})
