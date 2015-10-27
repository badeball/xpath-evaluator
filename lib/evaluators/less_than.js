/* eslint-env node */

"use strict";

var Helper = require("./helper");

module.exports = {
  evaluate: function (rootEvaluator, ast, context, type) {
    return Helper.compareNodes(
      ast.type,
      rootEvaluator.evaluate(ast.lhs, context, type),
      rootEvaluator.evaluate(ast.rhs, context, type),
      function (lhs, rhs) {
        return lhs < rhs;
      }
    );
  }
};
