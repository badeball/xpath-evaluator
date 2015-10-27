/* eslint-env node */

"use strict";

var Node = require("../node");

var NodeSetType = require("../types/node_set_type");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    var nodes = new NodeSetType();

    if (context.getNode().getNodeType() !== Node.DOCUMENT_NODE) {
      nodes = nodes.push(context.getNode().getParent());
    }

    return nodes;
  }
};
