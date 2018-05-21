import Assert from "assert";

import Context from "../../lib/context";

import Position from "../../lib/functions/position";

describe("XPathEvaluator", function () {
  describe("position()", function () {
    it("should return the position of the context", function () {
      var result = Position(new Context(null, 3, 0));

      Assert.equal(result.value, 3);
    });
  });
});
