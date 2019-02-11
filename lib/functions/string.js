import XPathNodeSet from "../types/xpath_node_set";

import XPathString from "../types/xpath_string";

export default function evaluate (context, value) {
  if (!value) {
    value = new XPathNodeSet([context.getNode()]);
  }

  if (arguments.length > 2) {
    throw new Error("Expected at most one argument");
  }

  return new XPathString(value.asString());
}
