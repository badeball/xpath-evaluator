"use strict";

var Assert = require("assert");

var StringType = require("../../lib/types/string_type");

var Concat = require("../../lib/functions/concat");

describe("XPathEvaluator", function () {
  describe("concat()", function () {
    it("should return the concatenation of the args", function () {
      var result = Concat.evaluate(null, new StringType("foo"), new StringType("bar"), new StringType("baz"));

      Assert.equal(result.value, "foobarbaz");
    });
  });
});
