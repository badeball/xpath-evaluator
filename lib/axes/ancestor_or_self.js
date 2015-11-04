"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var Ancestor = require("./ancestor");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    var nodes = new XPathNodeSet([context.getNode()], true);

    return Ancestor.evaluate(rootEvaluator, context).merge(nodes);
  }
};
