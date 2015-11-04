"use strict";

var Context = require("../context");

var Node = require("../node");

var XPathNodeSet = require("../types/xpath_node_set");

function Ancestor () {}

Ancestor.prototype.evaluate = function (rootEvaluator, context) {
  var nodes = new XPathNodeSet();

  if (context.getNode().getNodeType() !== Node.DOCUMENT_NODE) {
    nodes = nodes.unshift(context.getNode().getParent());

    nodes = nodes.merge(this.evaluate(rootEvaluator, new Context(context.getNode().getParent())));
  }

  return nodes;
};

module.exports = Ancestor;
