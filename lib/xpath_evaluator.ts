import {
  IAdapter,
  AdapterType,
  XPathResultType
} from "./types.d";

import XPathExpression from "./xpath_expression";

import XPathResult from "./xpath_result";

function throwNotImplemented () {
  throw new Error("Namespaces are not implemented");
}

export default class XPathEvaluator<T> {
  private adapter: AdapterType<T>;

  constructor(adapter: AdapterType<T>) {
    this.adapter = adapter;
  }

  evaluate(expression: string, context: T, nsResolver: XPathNSResolver | ((prefix: string) => string | null) | null, type: XPathResultType, result?: XPathResult<T>): XPathResult<T> {
    if (nsResolver) {
      throwNotImplemented();
    }

    return this.createExpression(expression).evaluate(context, type);
  }

  createExpression(expression: string, nsResolver?: XPathNSResolver): XPathExpression<T> {
    if (nsResolver) {
      throwNotImplemented();
    }

    return new XPathExpression<T>(expression, this.adapter);
  }

  createNSResolver(resolver?: Node) {
    throwNotImplemented();
  }
}

export { IAdapter };

export { XPathResult };

export * from "./node";
