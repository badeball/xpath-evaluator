import Assert from "assert";

import XPathString from "../../lib/types/xpath_string";

import Concat from "../../lib/functions/concat";

describe("XPathEvaluator", function () {
  describe("concat()", function () {
    it("should return the concatenation of the args", function () {
      var result = Concat(null, new XPathString("foo"), new XPathString("bar"), new XPathString("baz"));

      Assert.equal(result.value, "foobarbaz");
    });
  });
});
