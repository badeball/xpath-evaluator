import XPathNodeSet from "../types/xpath_node_set";

import XPathNumber from "../types/xpath_number";

export default function evaluate (context, ...args) {
  if (args.length !== 1) {
    throw new Error("Expected a single argument");
  }

  var nodeset = args[0];

  if (!(nodeset instanceof XPathNodeSet)) {
    throw new Error("Wrong type of argument");
  }

  return new XPathNumber(nodeset.length());
}
