/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var StringType = require("../../lib/types/string_type");

var Contains = require("../../lib/functions/contains");

describe("XPathEvaluator", function () {
  describe("contains()", function () {
    it("should return true if the 1st arg contains the 2nd arg", function () {
      var result = Contains.evaluate(null, new StringType("foobarbaz"), new StringType("baz"));

      Assert.equal(result.value, true);
    });

    it("should return false if the 1st arg doesn't contain the 2nd arg", function () {
      var result = Contains.evaluate(null, new StringType("bar"), new StringType("foo"));

      Assert.equal(result.value, false);
    });
  });
});
