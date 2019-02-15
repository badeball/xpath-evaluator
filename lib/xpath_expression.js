import XPathAnalyzer from "xpath-analyzer";

import Context from "./context";

import Evaluators from "./evaluators";

import XPathResult from "./xpath_result";

export default class XPathExpression {
  constructor(expression, adapter) {
    this.ast = new XPathAnalyzer(expression).parse();
    this.adapter = adapter;
  }

  evaluate(context, type) {
    var Adapter = this.adapter;

    return XPathExpression.evaluate(this.ast, new Context(new Adapter(context), 1, 1), type);
  }

  static evaluate(ast, context, type) {
    var evaluator = Evaluators[ast.type];

    var value = evaluator(XPathExpression, ast, context, type);

    return new XPathResult(type, value);
  }
}
