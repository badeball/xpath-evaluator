import {
  UnionNode
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import Context from "../context";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: UnionNode,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  if (!(lhs instanceof XPathNodeSet) ) {
    throw new Error("Union operator can only be used with expression yielding node-set");
  }

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  if (!(rhs instanceof XPathNodeSet) ) {
    throw new Error("Union operator can only be used with expression yielding node-set");
  }

  return lhs.merge(rhs);
}
