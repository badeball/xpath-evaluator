import XPathNodeSet from "../types/xpath_node_set";

import XPathString from "../types/xpath_string";

export default function evaluate (context, ...args) {
  var nodeset = args[0];

  if (!nodeset) {
    nodeset = new XPathNodeSet([context.getNode()]);
  }

  if (args.length > 1) {
    throw new Error("Expected at most one argument");
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
