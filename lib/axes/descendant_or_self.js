"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var Descendant = require("./descendant");

function DescendantOrSelf () {}

DescendantOrSelf.prototype.evaluate = function (rootEvaluator, context) {
  var nodes = new XPathNodeSet([context.getNode()]);

  return nodes.merge(new Descendant().evaluate(rootEvaluator, context));
};

module.exports = DescendantOrSelf;
