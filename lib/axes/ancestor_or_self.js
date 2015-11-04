"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var Ancestor = require("./ancestor");

function AncestorOrSelf () {}

AncestorOrSelf.prototype.evaluate = function (rootEvaluator, context) {
  var nodes = new XPathNodeSet([context.getNode()], true);

  return new Ancestor().evaluate(rootEvaluator, context).merge(nodes);
};

module.exports = AncestorOrSelf;
