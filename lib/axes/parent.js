import { DOCUMENT_NODE } from "../node";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate (rootEvaluator, context, type) {
  var nodes = new XPathNodeSet();

  if (context.getNode().getNodeType() !== DOCUMENT_NODE) {
    nodes = nodes.push(context.getNode().getParent());
  }

  return nodes;
}
