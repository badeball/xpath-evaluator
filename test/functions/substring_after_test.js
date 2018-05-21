import Assert from "assert";

import XPathString from "../../lib/types/xpath_string";

import SubstringAfter from "../../lib/functions/substring_after";

describe("XPathEvaluator", function () {
  describe("substring-after()", function () {
    it("should return the substring of the 1st arg that follows the 1st occurrence of the 2nd arg", function () {
      var result = SubstringAfter(null, new XPathString("1999/04/01"), new XPathString("/"));

      Assert.equal(result.value, "04/01");
    });
  });
});
