/* eslint-env node */

"use strict";

var XPathExpression = require("../xpath_expression");

var NumberType = require("../types/number_type");

module.exports = {
  evaluate: function (ast, context, type) {
    var lhs = XPathExpression.evaluate(ast.lhs, context, type);

    var rhs = XPathExpression.evaluate(ast.rhs, context, type);

    return new NumberType(lhs.asNumber() - rhs.asNumber());
  }
};
