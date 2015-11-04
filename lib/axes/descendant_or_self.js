"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var Descendant = require("./descendant");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    var nodes = new XPathNodeSet([context.getNode()]);

    return nodes.merge(Descendant.evaluate(rootEvaluator, context));
  }
};
