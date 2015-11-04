"use strict";

var Assert = require("assert");

var Context = require("../../lib/context");

var Position = require("../../lib/functions/position");

describe("XPathEvaluator", function () {
  describe("position()", function () {
    it("should return the position of the context", function () {
      var result = new Position(new Context(null, 3, 0)).evaluate();

      Assert.equal(result.value, 3);
    });
  });
});
