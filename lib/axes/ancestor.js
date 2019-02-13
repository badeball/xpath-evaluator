import Context from "../context";

import { DOCUMENT_NODE } from "../node";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate(rootEvaluator, context) {
  var nodes = new XPathNodeSet();

  if (context.getNode().getNodeType() !== DOCUMENT_NODE) {
    nodes = nodes.unshift(context.getNode().getParent());

    nodes = nodes.merge(evaluate(rootEvaluator, new Context(context.getNode().getParent(), 1, 1)));
  }

  return nodes;
}
