"use strict";

var Assert = require("assert");

var Context = require("../../lib/context");

var Last = require("../../lib/functions/last");

describe("XPathEvaluator", function () {
  describe("last()", function () {
    it("should return the size of the context", function () {
      var result = new Last(new Context(null, 0, 3)).evaluate();

      Assert.equal(result.value, 3);
    });
  });
});
