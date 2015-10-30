"use strict";

var Assert = require("assert");

var StringType = require("../../lib/types/string_type");

var SubstringBefore = require("../../lib/functions/substring_before");

describe("XPathEvaluator", function () {
  describe("substring-before()", function () {
    it("should return the substring of the 1st arg that precedes the 1st occurrence of the 2nd arg", function () {
      var result = SubstringBefore.evaluate(null, new StringType("1999/04/01"), new StringType("/"));

      Assert.equal(result.value, "1999");
    });
  });
});
