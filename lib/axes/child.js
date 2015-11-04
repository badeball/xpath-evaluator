"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

function Child () {}

Child.prototype.evaluate = function (rootEvaluator, context) {
  return new XPathNodeSet(context.getNode().getChildNodes());
};

module.exports = Child;
