import Context from "../context";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate (rootEvaluator, context, type) {
  var nodes = new XPathNodeSet();

  var children = new XPathNodeSet(context.getNode().getChildNodes());

  for (var child of children.iterator()) {
    nodes = nodes.push(child);

    nodes = nodes.merge(evaluate(rootEvaluator, new Context(child, 1, 1), type));
  }

  return nodes;
}
