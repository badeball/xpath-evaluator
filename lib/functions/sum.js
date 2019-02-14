import XPathNodeSet from "../types/xpath_node_set";

import XPathNumber from "../types/xpath_number";

export default function evaluate (context, nodeset) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  if (!(nodeset instanceof XPathNodeSet)) {
    throw new Error("Wrong type of argument");
  }

  var sum = 0;

  for (var node of nodeset.iterator()) {
    sum = sum + node.asNumber();
  }

  return new XPathNumber(sum);
}
