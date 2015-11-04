"use strict";

var Node = require("../node");

var XPathNodeSet = require("../types/xpath_node_set");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    var nodes = new XPathNodeSet();

    if (context.getNode().getNodeType() !== Node.DOCUMENT_NODE) {
      nodes = nodes.push(context.getNode().getParent());
    }

    return nodes;
  }
};
