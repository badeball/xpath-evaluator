"use strict";

var Assert = require("assert");

var XPathString = require("../../lib/types/xpath_string");

var StartsWith = require("../../lib/functions/starts_with");

describe("XPathEvaluator", function () {
  describe("starts-with()", function () {
    it("should return true if the 1st arg starts with the 2nd arg", function () {
      var result = new StartsWith().evaluate(null, new XPathString("foobar"), new XPathString("foo"));

      Assert.equal(result.value, true);
    });

    it("should return false if the 1st arg doesn't start with the 2nd arg", function () {
      var result = new StartsWith().evaluate(null, new XPathString("bar"), new XPathString("foo"));

      Assert.equal(result.value, false);
    });
  });
});
