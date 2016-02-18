"use strict";

var XPathExpression = require("./xpath_expression");

var XPathResult = require("./xpath_result");

var Node = require("./node");

function throwNotImplemented () {
  throw new Error("Namespaces are not implemented");
}

function XPathEvaluator (adapter) {
  this.adapter = adapter;
}

XPathEvaluator.prototype.evaluate = function (expression, context, nsResolver, type) {
  if (nsResolver) {
    throwNotImplemented();
  }

  var value = this.createExpression(expression).evaluate(context, type, this.adapter);

  return new XPathResult(type, value);
};

XPathEvaluator.prototype.createExpression = function (expression, nsResolver) {
  if (nsResolver) {
    throwNotImplemented();
  }

  return new XPathExpression(expression);
};

XPathEvaluator.prototype.createNSResolver = function () {
  throwNotImplemented();
};

XPathEvaluator.prototype.XPathResult = XPathEvaluator.XPathResult = XPathResult;

XPathEvaluator.prototype.Node = XPathEvaluator.Node = Node;

module.exports = XPathEvaluator;
