/* eslint-env node */

"use strict";

var XPathExpression = require("../xpath_expression");

var BooleanType = require("../types/boolean_type");

module.exports = {
  evaluate: function (ast, context, type) {
    var lhs = XPathExpression.evaluate(ast.lhs, context, type);

    if (lhs.asBoolean()) {
      return new BooleanType(true);
    }

    return XPathExpression.evaluate(ast.rhs, context, type);
  }
};
