import Context from "../context";

import { XPathValue } from "../types.d";

import XPathNodeSet from "../types/xpath_node_set";

import XPathString from "../types/xpath_string";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  var value = args[0];

  if (!value) {
    value = new XPathNodeSet([context.getNode()]);
  }

  if (args.length > 1) {
    throw new Error("Expected at most one argument");
  }

  return new XPathString(value.asString());
}
