import Assert from "assert";

import XPathString from "../../lib/types/xpath_string";

import XPathNumber from "../../lib/types/xpath_number";

import Substring from "../../lib/functions/substring";

function assertSubstring () {
  var substringArgs = [].slice.call(arguments),
      expectedResult = substringArgs.shift();

  it("should return " + expectedResult + " when provided " + substringArgs.join(", "), function () {
    substringArgs = substringArgs.map(function (arg, i) {
      if (i === 0) {
        return new XPathString(arg);
      } else {
        return new XPathNumber(arg);
      }
    });

    substringArgs.unshift(null);

    Assert.equal(Substring.apply(null, substringArgs).value, expectedResult);
  });
}

describe("XPathEvaluator", function () {
  describe("substring()", function () {
    assertSubstring("234", "12345", 2, 3);

    assertSubstring("2345", "12345", 2);

    assertSubstring("234", "12345", 1.5, 2.6);

    assertSubstring("12", "12345", 0, 3);

    assertSubstring("", "12345", 0 / 0, 3);

    assertSubstring("", "12345", 1, 0 / 0);

    assertSubstring("12345", "12345", -42, 1 / 0);

    assertSubstring("", "12345", -1 / 0, 1 / 0);
  });
});
