import {
  RelationalNode
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import Context from "../context";

import * as Helper from "./helper";

import XPathBoolean from "../types/xpath_boolean";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: RelationalNode,
  context: Context<T>,
  type: XPathResultType
): XPathBoolean {
  return Helper.compareNodes(
    ast.type,
    rootEvaluator.evaluate(ast.lhs, context, type),
    rootEvaluator.evaluate(ast.rhs, context, type),
    function (lhs, rhs) {
      return lhs >= rhs;
    }
  );
}
