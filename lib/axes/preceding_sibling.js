"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

function PrecedingSibling () {}

PrecedingSibling.prototype.evaluate = function (rootEvaluator, context) {
  return new XPathNodeSet(context.getNode().getPrecedingSiblings());
};

module.exports = PrecedingSibling;
