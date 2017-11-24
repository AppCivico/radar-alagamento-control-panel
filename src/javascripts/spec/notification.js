import React from "react";
import chaiEnzyme from "chai-enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import Notification from "../app/components/notification";

configure({ adapter: new Adapter() });

// HACK: chai-enzyme does not play nice with chai-jquery, so remove the
// problem-causing assertions that collide with chai-jquery
"visible hidden selected checked enabled disabled"
  .split(" ")
  .forEach(selector => {
    Object.defineProperty(chai.Assertion.prototype, selector, {
      get: () => {}
    });
  });

chai.use(chaiEnzyme());

describe("<Notification />", () => {
  context("e2e", () => {
    it("closes modal", () => {
      cy.visit("/notifications");
      cy.get("body").then($body => {
        if ($body.find(".notifications:first .btn-danger").length) {
          cy.get(".notifications:first .btn-danger").click();
          cy.get(".close").click();
          cy.get("#notification").should("not.have.class", "open");
        }
      });
    });
  });
});
