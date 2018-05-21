import XPathNodeSet from "../types/xpath_node_set";

import XPathString from "../types/xpath_string";

export default function evaluate (context, nodeset) {
  if (!nodeset) {
    nodeset = new XPathNodeSet([context.getNode()]);
  }

  if (arguments.length > 2) {
    throw new Error("Unknown argument(s)");
  }

  if (!(nodeset instanceof XPathNodeSet)) {
    throw new Error("Wrong type of argument");
  }

  if (nodeset.empty()) {
    return new XPathString("");
  } else {
    return new XPathString(nodeset.first().getName());
  }
}
