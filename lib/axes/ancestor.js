"use strict";

var Context = require("../context");

var Node = require("../node");

var NodeSetType = require("../types/node_set_type");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    var nodes = new NodeSetType();

    if (context.getNode().getNodeType() !== Node.DOCUMENT_NODE) {
      nodes = nodes.unshift(context.getNode().getParent());

      nodes = nodes.merge(this.evaluate(rootEvaluator, new Context(context.getNode().getParent())));
    }

    return nodes;
  }
};
