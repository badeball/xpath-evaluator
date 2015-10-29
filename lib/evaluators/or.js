/* eslint-env node */

"use strict";

var BooleanType = require("../types/boolean_type");

module.exports = {
  evaluate: function (rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

    if (lhs.asBoolean()) {
      return new BooleanType(true);
    }

    return rootEvaluator.evaluate(ast.rhs, context, type);
  }
};
