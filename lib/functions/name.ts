import Context from "../context";

import { IAdapter, XPathValue } from "../types.d";

import XPathString from "../types/xpath_string";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  var nodeset = args[0];

  if (!nodeset) {
    return new XPathString(context.getNode().getName());
  } else {
    if (args.length > 1) {
      throw new Error("Expected at most one argument");
    }

    if (!(nodeset instanceof XPathNodeSet)) {
      throw new Error("Wrong type of argument");
    }

    if (nodeset.empty()) {
      return new XPathString("");
    } else {
      return new XPathString((nodeset.first() as IAdapter<T>).getName());
    }
  }
}
