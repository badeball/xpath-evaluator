import {
  AndNode
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import Context from "../context";

import XPathBoolean from "../types/xpath_boolean";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: AndNode,
  context: Context<T>,
  type: XPathResultType
): XPathBoolean {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  if (!lhs.asBoolean()) {
    return new XPathBoolean(false);
  }

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathBoolean(rhs.asBoolean());
}
