"use strict";

var NumberType = require("../types/number_type");

module.exports = {
  evaluate: function (rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

    return new NumberType(-lhs.asNumber());
  }
};
