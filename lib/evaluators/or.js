"use strict";

var XPathBoolean = require("../types/xpath_boolean");

function Or () {}

Or.prototype.evaluate = function (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  if (lhs.asBoolean()) {
    return new XPathBoolean(true);
  }

  return rootEvaluator.evaluate(ast.rhs, context, type);
};

module.exports = Or;
