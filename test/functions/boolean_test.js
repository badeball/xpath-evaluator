"use strict";

var Assert = require("assert");

var Context = require("../../lib/context");

/* eslint-disable no-underscore-dangle */
var Boolean_ = require("../../lib/functions/boolean");
/* eslint-enable no-underscore-dangle */

var XPathNodeSet = require("../../lib/types/xpath_node_set");

describe("XPathEvaluator", function () {
  describe("boolean()", function () {
    it("should throw an error when given no arguments", function () {
      Assert.throws(function () {
        Boolean_.evaluate(new Context());
      });
    });

    it("should return an error when given two arguments", function () {
      Assert.throws(function () {
        Boolean_.evaluate(new Context(), new XPathNodeSet(), new XPathNodeSet());
      });
    });

    it("should return false for an empty nodeset", function () {
      var result = Boolean_.evaluate(new Context(), new XPathNodeSet());

      Assert.equal(result.value, false);
    });

    it("should return true for an non-empty nodeset", function () {
      var result = Boolean_.evaluate(new Context(), new XPathNodeSet([{}]));

      Assert.equal(result.value, true);
    });
  });
});
