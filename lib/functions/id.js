"use strict";

var Node = require("../node");

var NodeSetType = require("../types/node_set_type");

var StringType = require("../types/string_type");

module.exports = {
  evaluate: function (context, value) {
    if (!value) {
      throw new Error("Missing argument");
    }

    if (arguments.length > 2) {
      throw new Error("Unknown argument(s)");
    }

    var node, ids = [];

    if (value instanceof NodeSetType) {
      var iter = value.iterator();

      while ((node = iter.next())) {
        ids = ids.concat(node.asString().split(/\s+/g));
      }
    } else if (value instanceof StringType) {
      ids = value.asString().split(/\s+/g);
    } else {
      ids.push(value.asString());
    }

    var nodes = new NodeSetType();

    for (var i = 0; i < ids.length; i++) {
      if (context.getNode().getNodeType() === Node.DOCUMENT_NODE) {
        node = context.getNode().getElementById(ids[i]);
      } else {
        node = context.getNode().getOwnerDocument().getElementById(ids[i]);
      }

      if (node) {
        nodes = nodes.merge(new NodeSetType([node]));
      }
    }

    return nodes;
  }
};
