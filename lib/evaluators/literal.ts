import {
  LiteralNode
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import Context from "../context";

import XPathString from "../types/xpath_string";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: LiteralNode,
  context: Context<T>,
  type: XPathResultType
): XPathString {
  return new XPathString(ast.string);
}
