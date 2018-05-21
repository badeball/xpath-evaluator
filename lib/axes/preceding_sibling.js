import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate (rootEvaluator, context) {
  return new XPathNodeSet(context.getNode().getPrecedingSiblings());
}
