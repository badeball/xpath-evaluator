import Assert from "assert";

import XPathString from "../../lib/types/xpath_string";

import SubstringBefore from "../../lib/functions/substring_before";

describe("XPathEvaluator", function () {
  describe("substring-before()", function () {
    it("should return the substring of the 1st arg that precedes the 1st occurrence of the 2nd arg", function () {
      var result = SubstringBefore(null, new XPathString("1999/04/01"), new XPathString("/"));

      Assert.equal(result.value, "1999");
    });
  });
});
