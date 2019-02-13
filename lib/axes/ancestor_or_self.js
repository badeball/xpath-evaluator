import XPathNodeSet from "../types/xpath_node_set";

import Ancestor from "./ancestor";

export default function evaluate (rootEvaluator, context, type) {
  var nodes = new XPathNodeSet([context.getNode()], true);

  return Ancestor(rootEvaluator, context, type).merge(nodes);
}
