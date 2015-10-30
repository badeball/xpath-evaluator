"use strict";

var Context = require("../context");

var XPathNodeSet = require("../types/xpath_node_set");

var Step = require("./step");

module.exports = {
  evaluate: function (rootEvaluator, ast, context, type) {
    var nodeSet = new XPathNodeSet([context.getNode()]),
        nextNodeSet = new XPathNodeSet();

    if (ast.steps) {
      for (var i = 0; i < ast.steps.length; i++) {
        var node, iter = nodeSet.iterator();

        while ((node = iter.next())) {
          var stepResult = Step.evaluate(rootEvaluator, ast.steps[i], new Context(node), type);

          nextNodeSet = nextNodeSet.merge(stepResult);
        }

        nodeSet = nextNodeSet;
        nextNodeSet = new XPathNodeSet();
      }
    }

    return nodeSet;
  }
};
