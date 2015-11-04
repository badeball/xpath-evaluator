"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

function Self () {}

Self.prototype.evaluate = function (rootEvaluator, context) {
  return new XPathNodeSet([context.getNode()]);
};

module.exports = Self;
