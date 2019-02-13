import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate (rootEvaluator, context, type) {
  return new XPathNodeSet([context.getNode()]);
}
