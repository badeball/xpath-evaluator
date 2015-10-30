"use strict";

var Assert = require("assert");

var StringType = require("../../lib/types/string_type");

var NumberType = require("../../lib/types/number_type");

var Substring = require("../../lib/functions/substring");

function assertSubstring () {
  var substringArgs = [].slice.call(arguments),
      expectedResult = substringArgs.shift();

  it("should return " + expectedResult + " when provided " + substringArgs.join(", "), function () {
    substringArgs = substringArgs.map(function (arg, i) {
      if (i === 0) {
        return new StringType(arg);
      } else {
        return new NumberType(arg);
      }
    });

    substringArgs.unshift(null);

    Assert.equal(Substring.evaluate.apply(null, substringArgs).value, expectedResult);
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
