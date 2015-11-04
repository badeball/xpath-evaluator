"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

function Attribute () {}

Attribute.prototype.evaluate = function (rootEvaluator, context) {
  return new XPathNodeSet(context.getNode().getAttributes());
};

module.exports = Attribute;
