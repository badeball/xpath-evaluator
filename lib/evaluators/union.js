/* eslint-env node */

"use strict";

module.exports = {
  evaluate: function (rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

    var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

    return lhs.merge(rhs);
  }
};
