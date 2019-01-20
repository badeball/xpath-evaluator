import Assert from "assert";

import Context from "../../lib/context";

import Boolean_ from "../../lib/functions/boolean";

import XPathNodeSet from "../../lib/types/xpath_node_set";

describe("XPathEvaluator", function () {
  describe("boolean()", function () {
    it("should throw an error when given no arguments", function () {
      Assert.throws(function () {
        Boolean_(new Context());
      });
    });

    it("should return an error when given two arguments", function () {
      Assert.throws(function () {
        Boolean_(new Context(), new XPathNodeSet(), new XPathNodeSet());
      });
    });

    it("should return false for an empty nodeset", function () {
      var result = Boolean_(new Context(), new XPathNodeSet());

      Assert.equal(result.value, false);
    });

    it("should return true for an non-empty nodeset", function () {
      var result = Boolean_(new Context(), new XPathNodeSet([{}]));

      Assert.equal(result.value, true);
    });
  });
});
