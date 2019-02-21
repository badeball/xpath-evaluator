import Context from "../context";

import { XPathValue } from "../types.d";

import XPathNodeSet from "../types/xpath_node_set";

import XPathString from "../types/xpath_string";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
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

  var first = nodeset.first();

  if (first) {
    return new XPathString(first.getName());
  } else {
    return new XPathString("");
  }
}
