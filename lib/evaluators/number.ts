import {
  NumberNode
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import Context from "../context";

import XPathNumber from "../types/xpath_number";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: NumberNode,
  context: Context<T>,
  type: XPathResultType
): XPathNumber {
  return new XPathNumber(ast.number);
}
