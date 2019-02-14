import { DOCUMENT_NODE } from "../node";

import XPathNodeSet from "../types/xpath_node_set";

import XPathString from "../types/xpath_string";

export default function evaluate (context, ...args) {
  if (args.length !== 1) {
    throw new Error("Expected a single argument");
  }

  var value = args[0];

  var node, ids = [];

  if (value instanceof XPathNodeSet) {
    for (node of value.iterator()) {
      ids = ids.concat(node.asString().split(/\s+/g));
    }
  } else if (value instanceof XPathString) {
    ids = value.asString().split(/\s+/g);
  } else {
    ids.push(value.asString());
  }

  var nodes = new XPathNodeSet();

  for (var i = 0; i < ids.length; i++) {
    if (context.getNode().getNodeType() === DOCUMENT_NODE) {
      node = context.getNode().getElementById(ids[i]);
    } else {
      node = context.getNode().getOwnerDocument().getElementById(ids[i]);
    }

    if (node) {
      nodes = nodes.merge(new XPathNodeSet([node]));
    }
  }

  return nodes;
}
