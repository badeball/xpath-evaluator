import Context from "../context";

import { XPathValue } from "../types.d";

import { DOCUMENT_NODE } from "../node";

import XPathNodeSet from "../types/xpath_node_set";

import XPathString from "../types/xpath_string";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  if (args.length !== 1) {
    throw new Error("Expected a single argument");
  }

  var value = args[0];

  var node, ids: string[] = [];

  if (value instanceof XPathNodeSet) {
    for (node of value.iterator()) {
      ids = ids.concat(node.asString().split(/\s+/g));
    }
  } else if (value instanceof XPathString) {
    ids = value.asString().split(/\s+/g);
  } else {
    ids.push(value.asString());
  }

  var nodes = new XPathNodeSet<T>();

  for (var i = 0; i < ids.length; i++) {
    node = context.getNode().getOwnerDocument().getElementById(ids[i]);

    if (node) {
      nodes = nodes.merge(new XPathNodeSet<T>([node]));
    }
  }

  return nodes;
}
