import Context from "../context";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate (rootEvaluator, context) {
  var nodes = new XPathNodeSet();

  var children = new XPathNodeSet(context.getNode().getChildNodes());

  var child, iter = children.iterator();

  while ((child = iter.next())) {
    nodes = nodes.push(child);

    nodes = nodes.merge(evaluate(rootEvaluator, new Context(child)));
  }

  return nodes;
}
