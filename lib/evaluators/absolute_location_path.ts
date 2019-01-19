import {
  AbsoluteLocationPathNode,
  RELATIVE_LOCATION_PATH
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import Context from "../context";

import RelativeLocationPath from "./relative_location_path";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: AbsoluteLocationPathNode,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  return RelativeLocationPath<T>(rootEvaluator, {
    type: RELATIVE_LOCATION_PATH,
    steps: ast.steps
  }, new Context<T>(context.getNode().getOwnerDocument(), 1, 1), type);
}
