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

    return this.createExpression(expression).evaluate(context, type);
  }

  createExpression(expression, nsResolver) {
    if (nsResolver) {
      throwNotImplemented();
    }

    return new XPathExpression(expression, this.adapter);
  }

  createNSResolver() {
    throwNotImplemented();
  }
}

export { XPathResult };
