import XPathExpression from "./xpath_expression";

import XPathResult from "./xpath_result";

function throwNotImplemented () {
  throw new Error("Namespaces are not implemented");
}

export default class XPathEvaluator {
  constructor(adapter) {
    this.adapter = adapter;
  }

  evaluate(expression, context, nsResolver, type) {
    if (nsResolver) {
      throwNotImplemented();
    }
  
    var value = this.createExpression(expression).evaluate(context, type, this.adapter);
  
    return new XPathResult(type, value);
  }

  createExpression(expression, nsResolver) {
    if (nsResolver) {
      throwNotImplemented();
    }
  
    return new XPathExpression(expression);
  }

  createNSResolver() {
    throwNotImplemented();
  }
}

export { XPathResult };
