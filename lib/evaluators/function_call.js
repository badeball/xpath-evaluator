/* eslint-env node */

"use strict";

var XPathExpression = require("../xpath_expression");

var Functions = require("../functions");

module.exports = {
  evaluate: function (ast, context, type) {
    var args = (ast.args || []).map(function (arg) {
      return XPathExpression.evaluate(arg, context, type);
    });

    args.unshift(context);

    var functionEvaluator = Functions[ast.name];

    if (functionEvaluator) {
      return functionEvaluator.evaluate.apply(null, args);
    } else {
      throw new Error("Unknown function " + ast.name);
    }
  }
};
