import { RootEvaluator, XPathResultType } from "../types.d";

import Context from "../context";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  var nodes = new XPathNodeSet<T>();

  var children = new XPathNodeSet<T>(context.getNode().getChildNodes());

  for (var child of children.iterator()) {
    nodes = nodes.push(child);

    nodes = nodes.merge(evaluate(rootEvaluator, new Context<T>(child, 1, 1), type));
  }

  return nodes;
}
