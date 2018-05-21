import Assert from "assert";

import Context from "../../lib/context";

import Last from "../../lib/functions/last";

describe("XPathEvaluator", function () {
  describe("last()", function () {
    it("should return the size of the context", function () {
      var result = Last(new Context(null, 0, 3));

      Assert.equal(result.value, 3);
    });
  });
});
