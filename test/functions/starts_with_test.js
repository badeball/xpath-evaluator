/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var StringType = require("../../lib/types/string_type");

var StartsWith = require("../../lib/functions/starts_with");

describe("XPathEvaluator", function () {
  describe("starts-with()", function () {
    it("should return true if the 1st arg starts with the 2nd arg", function () {
      var result = StartsWith.evaluate(null, new StringType("foobar"), new StringType("foo"));

      Assert.equal(result.value, true);
    });

    it("should return false if the 1st arg doesn't start with the 2nd arg", function () {
      var result = StartsWith.evaluate(null, new StringType("bar"), new StringType("foo"));

      Assert.equal(result.value, false);
    });
  });
});
