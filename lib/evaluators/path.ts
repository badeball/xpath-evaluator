import {
  PathNode,
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
  ast: PathNode,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  var nodes = rootEvaluator.evaluate(ast.filter, context, type);

  if (!(nodes instanceof XPathNodeSet)) {
    throw new Error("Paths can only be used when filter expression yields a node-set");
  }

  var nodeSets = [];

  for (var node of nodes.iterator()) {
    nodeSets.push(RelativeLocationPath(rootEvaluator, {
      type: RELATIVE_LOCATION_PATH,
      steps: ast.steps
    }, new Context(node, 1, 1), type));
  }

  return nodeSets.reduce(function (previousValue, currentValue) {
    return previousValue.merge(currentValue);
  });
}
