import Assert from "assert";

import XPathString from "../../lib/types/xpath_string";

import Contains from "../../lib/functions/contains";

describe("XPathEvaluator", function () {
  describe("contains()", function () {
    it("should return true if the 1st arg contains the 2nd arg", function () {
      var result = Contains(null, new XPathString("foobarbaz"), new XPathString("baz"));

      Assert.equal(result.value, true);
    });

    it("should return false if the 1st arg doesn't contain the 2nd arg", function () {
      var result = Contains(null, new XPathString("bar"), new XPathString("foo"));

      Assert.equal(result.value, false);
    });
  });
});
