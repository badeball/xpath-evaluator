/* eslint-env node */

"use strict";

function XPathExpression (expression) {
  this.expression = expression;
}

module.exports = XPathExpression;

var XPathAnalyzer = require("xpath-analyzer");

var Context = require("./context");

var Evaluators = require("./evaluators");

XPathExpression.evaluate = function (ast, context, type) {
  var evaluator = Evaluators[ast.type];

  return evaluator.evaluate(ast, context, type);
};

XPathExpression.prototype.evaluate = function (context, type, Adapter) {
  var ast = new XPathAnalyzer(this.expression).parse();

  return XPathExpression.evaluate(ast, new Context(new Adapter(context)), type);
};
