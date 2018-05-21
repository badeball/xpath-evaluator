import Assert from "assert";

import XPathString from "../../lib/types/xpath_string";

import StartsWith from "../../lib/functions/starts_with";

describe("XPathEvaluator", function () {
  describe("starts-with()", function () {
    it("should return true if the 1st arg starts with the 2nd arg", function () {
      var result = StartsWith(null, new XPathString("foobar"), new XPathString("foo"));

      Assert.equal(result.value, true);
    });

    it("should return false if the 1st arg doesn't start with the 2nd arg", function () {
      var result = StartsWith(null, new XPathString("bar"), new XPathString("foo"));

      Assert.equal(result.value, false);
    });
  });
});
