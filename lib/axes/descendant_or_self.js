import XPathNodeSet from "../types/xpath_node_set";

import Descendant from "./descendant";

export default function evaluate (rootEvaluator, context, type) {
  var nodes = new XPathNodeSet([context.getNode()]);

  return nodes.merge(Descendant(rootEvaluator, context, type));
}
