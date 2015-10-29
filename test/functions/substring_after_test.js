/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var StringType = require("../../lib/types/string_type");

var SubstringAfter = require("../../lib/functions/substring_after");

describe("XPathEvaluator", function () {
  describe("substring-after()", function () {
    it("should return the substring of the 1st arg that follows the 1st occurrence of the 2nd arg", function () {
      var result = SubstringAfter.evaluate(null, new StringType("1999/04/01"), new StringType("/"));

      Assert.equal(result.value, "04/01");
    });
  });
});