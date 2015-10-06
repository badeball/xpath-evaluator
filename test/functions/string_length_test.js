/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var StringType = require("../../lib/types/string_type");

var StringLength = require("../../lib/functions/string_length");

describe("XPathEvaluator", function () {
  describe("string-length()", function () {
    it("should return the length of the string", function () {
      var result = StringLength.evaluate(null, new StringType("foo"));

      Assert.equal(result.value, 3);
    });
  });
});
