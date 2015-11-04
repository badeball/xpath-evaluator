"use strict";

var Assert = require("assert");

var XPathString = require("../../lib/types/xpath_string");

var Concat = require("../../lib/functions/concat");

describe("XPathEvaluator", function () {
  describe("concat()", function () {
    it("should return the concatenation of the args", function () {
      var result = new Concat().evaluate(null, new XPathString("foo"), new XPathString("bar"), new XPathString("baz"));

      Assert.equal(result.value, "foobarbaz");
    });
  });
});
