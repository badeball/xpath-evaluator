import { RootEvaluator, XPathResultType } from "../types.d";

import Context from "../context";

import { DOCUMENT_NODE } from "../node";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  var nodes = new XPathNodeSet<T>();

  if (context.getNode().getNodeType() !== DOCUMENT_NODE) {
    nodes = nodes.unshift(context.getNode().getParent());

    nodes = nodes.merge(evaluate(rootEvaluator, new Context<T>(context.getNode().getParent(), 1, 1), type));
  }

  return nodes;
}
