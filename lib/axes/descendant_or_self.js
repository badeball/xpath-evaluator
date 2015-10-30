"use strict";

var NodeSetType = require("../types/node_set_type");

var Descendant = require("./descendant");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    var nodes = new NodeSetType([context.getNode()]);

    return nodes.merge(Descendant.evaluate(rootEvaluator, context));
  }
};
