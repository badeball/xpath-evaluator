import Assert from "assert";

import XPathString from "../../lib/types/xpath_string";

import StringLength from "../../lib/functions/string_length";

describe("XPathEvaluator", function () {
  describe("string-length()", function () {
    it("should return the length of the string", function () {
      var result = StringLength(null, new XPathString("foo"));

      Assert.equal(result.value, 3);
    });
  });
});
