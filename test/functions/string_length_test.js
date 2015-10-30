"use strict";

var Assert = require("assert");

var XPathString = require("../../lib/types/xpath_string");

var StringLength = require("../../lib/functions/string_length");

describe("XPathEvaluator", function () {
  describe("string-length()", function () {
    it("should return the length of the string", function () {
      var result = StringLength.evaluate(null, new XPathString("foo"));

      Assert.equal(result.value, 3);
    });
  });
});
