"use strict";

var Assert = require("assert");

var XPathString = require("../../lib/types/xpath_string");

var Contains = require("../../lib/functions/contains");

describe("XPathEvaluator", function () {
  describe("contains()", function () {
    it("should return true if the 1st arg contains the 2nd arg", function () {
      var result = new Contains().evaluate(null, new XPathString("foobarbaz"), new XPathString("baz"));

      Assert.equal(result.value, true);
    });

    it("should return false if the 1st arg doesn't contain the 2nd arg", function () {
      var result = new Contains().evaluate(null, new XPathString("bar"), new XPathString("foo"));

      Assert.equal(result.value, false);
    });
  });
});
