/* eslint-env node */

"use strict";

var XPathExpression = require("../xpath_expression");

var Helper = require("./helper");

module.exports = {
  evaluate: function (ast, context, type) {
    return Helper.compareNodes(
      ast.type,
      XPathExpression.evaluate(ast.lhs, context, type),
      XPathExpression.evaluate(ast.rhs, context, type),
      function (lhs, rhs) {
        return lhs === rhs;
      }
    );
  }
};
