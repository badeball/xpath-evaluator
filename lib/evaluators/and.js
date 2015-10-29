/* eslint-env node */

"use strict";

var XPathBoolean = require("../types/xpath_boolean");

module.exports = {
  evaluate: function (rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

    if (!lhs.asBoolean()) {
      return new XPathBoolean(false);
    }

    return rootEvaluator.evaluate(ast.rhs, context, type);
  }
};
