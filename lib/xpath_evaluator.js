import XPathExpression from "./xpath_expression";

import XPathResult from "./xpath_result";

function throwNotImplemented () {
  throw new Error("Namespaces are not implemented");
}

export default function XPathEvaluator (adapter) {
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

export { XPathResult };

export * from "./node";
