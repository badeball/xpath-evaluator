/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var Context = require("../../lib/context");

var Last = require("../../lib/functions/last");

describe("XPathEvaluator", function () {
  describe("last()", function () {
    it("should return the size of the context", function () {
      var result = Last.evaluate(new Context(null, 0, 3));

      Assert.equal(result.value, 3);
    });
  });
});
