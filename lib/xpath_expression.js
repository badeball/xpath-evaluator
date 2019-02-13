import XPathAnalyzer from "xpath-analyzer";

import Context from "./context";

import Evaluators from "./evaluators";

export default class XPathExpression {
  constructor(expression) {
    this.expression = expression;
  }

  evaluate(context, type, Adapter) {
    var ast = new XPathAnalyzer(this.expression).parse();

    return XPathExpression.evaluate(ast, new Context(new Adapter(context), 1, 1), type);
  }

  static evaluate(ast, context, type) {
    var evaluator = Evaluators[ast.type];

    return evaluator(XPathExpression, ast, context, type);
  }
}
