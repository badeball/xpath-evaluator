import {
  AdditiveNode
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import Context from "../context";

import XPathNumber from "../types/xpath_number";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: AdditiveNode,
  context: Context<T>,
  type: XPathResultType
): XPathNumber {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathNumber(lhs.asNumber() - rhs.asNumber());
}
