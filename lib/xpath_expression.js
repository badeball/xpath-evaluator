/* eslint-env node */

"use strict";

var XPathAnalyzer = require("xpath-analyzer");

var Context = require("./context");

var Evaluators = require("./evaluators");

function XPathExpression (expression) {
  this.expression = expression;
}

XPathExpression.evaluate = function (ast, context, type) {
  var evaluator = Evaluators[ast.type];

  return evaluator.evaluate(XPathExpression, ast, context, type);
};

XPathExpression.prototype.evaluate = function (context, type, Adapter) {
  var ast = new XPathAnalyzer(this.expression).parse();

  return XPathExpression.evaluate(ast, new Context(new Adapter(context)), type);
};

module.exports = XPathExpression;
