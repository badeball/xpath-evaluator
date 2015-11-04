"use strict";

var Assert = require("assert");

var XPathString = require("../../lib/types/xpath_string");

var SubstringBefore = require("../../lib/functions/substring_before");

describe("XPathEvaluator", function () {
  describe("substring-before()", function () {
    it("should return the substring of the 1st arg that precedes the 1st occurrence of the 2nd arg", function () {
      var result = new SubstringBefore().evaluate(null, new XPathString("1999/04/01"), new XPathString("/"));

      Assert.equal(result.value, "1999");
    });
  });
});
