/* eslint-env node */

"use strict";

var XPathAnalyzer = require("xpath-analyzer");

var Axes = require("../axes");

var Context = require("../context");

var XPathNumber = require("../types/xpath_number");

var XPathNodeSet = require("../types/xpath_node_set");

var Node = require("../node");

module.exports = {
  evaluate: function (rootEvaluator, step, context, type) {
    var nodes;

    var axisEvaluator = Axes[step.axis];

    if (axisEvaluator) {
      nodes = axisEvaluator.evaluate(rootEvaluator, context, type);
    } else {
      throw new Error("Unknown axis specifier " + step.axis);
    }

    if (step.test.name) {
      var name = step.test.name;

      nodes = nodes.filter(function (node) {
        return (name === "*" && node.getName()) || node.getName() === step.test.name;
      });
    }

    if (step.test.type && step.test.type !== XPathAnalyzer.NodeType.NODE) {
      var nodeType;

      switch (step.test.type) {
        case XPathAnalyzer.NodeType.COMMENT:
          nodeType = Node.COMMENT_NODE;
          break;

        case XPathAnalyzer.NodeType.PROCESSING_INSTRUCTION:
          nodeType = Node.PROCESSING_INSTRUCTION_NODE;
          break;

        case XPathAnalyzer.NodeType.TEXT:
          nodeType = Node.TEXT_NODE;
          break;

        default:
          throw new Error("Unknown node nodeType " + step.test.nodeType);
      }

      nodes = nodes.filter(function (node) {
        return node.getNodeType() === nodeType;
      });
    }

    if (step.predicates) {
      var reversed = (
          step.axis === XPathAnalyzer.AxisSpecifier.ANCESTOR ||
          step.axis === XPathAnalyzer.AxisSpecifier.ANCESTOR_OR_SELF ||
          step.axis === XPathAnalyzer.AxisSpecifier.PRECEDING ||
          step.axis === XPathAnalyzer.AxisSpecifier.PRECEDING_SIBLING);

      var node, position = 0, filteredNodes = [], iter = nodes.iterator(reversed);

      while ((node = iter.next())) {
        position++;

        var keep = step.predicates.every(function (predicate) {
          var result = rootEvaluator.evaluate(predicate, new Context(node, position, nodes.length()), type);

          if (result === null) {
            return false;
          }

          if (result instanceof XPathNumber) {
            return result.asNumber() === position;
          } else {
            return result.asBoolean();
          }
        });

        if (keep) {
          filteredNodes.push(node);
        }
      }

      nodes = new XPathNodeSet(filteredNodes);
    }

    return nodes;
  }
};
