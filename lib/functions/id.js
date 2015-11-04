"use strict";

var Node = require("../node");

var XPathNodeSet = require("../types/xpath_node_set");

var XPathString = require("../types/xpath_string");

function Id (context) {
  this.context = context;
}

Id.prototype.evaluate = function (value) {
  if (!value) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 1) {
    throw new Error("Unknown argument(s)");
  }

  var node, ids = [];

  if (value instanceof XPathNodeSet) {
    var iter = value.iterator();

    while ((node = iter.next())) {
      ids = ids.concat(node.asString().split(/\s+/g));
    }
  } else if (value instanceof XPathString) {
    ids = value.asString().split(/\s+/g);
  } else {
    ids.push(value.asString());
  }

  var nodes = new XPathNodeSet();

  for (var i = 0; i < ids.length; i++) {
    if (this.context.getNode().getNodeType() === Node.DOCUMENT_NODE) {
      node = this.context.getNode().getElementById(ids[i]);
    } else {
      node = this.context.getNode().getOwnerDocument().getElementById(ids[i]);
    }

    if (node) {
      nodes = nodes.merge(new XPathNodeSet([node]));
    }
  }

  return nodes;
};

module.exports = Id;
