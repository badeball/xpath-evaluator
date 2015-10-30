"use strict";

var Assert = require("assert");

var StringType = require("../../lib/types/string_type");

var Translate = require("../../lib/functions/translate");

function assertTranslate (expectedResult, base, mapFrom, mapTo) {
  it("should return " + expectedResult + " when provided " + base + ", " + mapFrom + ", " + mapTo, function () {
    base = new StringType(base);
    mapFrom = new StringType(mapFrom);
    mapTo = new StringType(mapTo);

    Assert.equal(Translate.evaluate(null, base, mapFrom, mapTo).value, expectedResult);
  });
}

describe("XPathEvaluator", function () {
  describe("translate()", function () {
    assertTranslate("BAr", "bar", "abc", "ABC");

    assertTranslate("BAr", "bar", "abc", "ABCDEF");

    assertTranslate("AAA", "--aaa--", "abc-", "ABC");
  });
});
