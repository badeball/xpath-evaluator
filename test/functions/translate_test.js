import Assert from "assert";

import XPathString from "../../lib/types/xpath_string";

import Translate from "../../lib/functions/translate";

function assertTranslate (expectedResult, base, mapFrom, mapTo) {
  it("should return " + expectedResult + " when provided " + base + ", " + mapFrom + ", " + mapTo, function () {
    base = new XPathString(base);
    mapFrom = new XPathString(mapFrom);
    mapTo = new XPathString(mapTo);

    Assert.equal(Translate(null, base, mapFrom, mapTo).value, expectedResult);
  });
}

describe("XPathEvaluator", function () {
  describe("translate()", function () {
    assertTranslate("BAr", "bar", "abc", "ABC");

    assertTranslate("BAr", "bar", "abc", "ABCDEF");

    assertTranslate("AAA", "--aaa--", "abc-", "ABC");
  });
});
