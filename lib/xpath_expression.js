"use strict";

var XPathAnalyzer = require("xpath-analyzer");

var Context = require("./context");

var Evaluators = require("./evaluators");

function XPathExpression (expression) {
  this.expression = expression;
}

XPathExpression.evaluate = function (ast, context, type) {
  var Evaluator = Evaluators[ast.type];

  return new Evaluator().evaluate(XPathExpression, ast, context, type);
};

XPathExpression.prototype.evaluate = function (context, type, Adapter) {
  var ast = new XPathAnalyzer(this.expression).parse();

  return XPathExpression.evaluate(ast, new Context(new Adapter(context)), type);
};

module.exports = XPathExpression;
