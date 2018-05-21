import {
  ANCESTOR,
  ANCESTOR_OR_SELF,
  PRECEDING,
  PRECEDING_SIBLING
} from "xpath-analyzer";

import {
  COMMENT,
  NODE,
  PROCESSING_INSTRUCTION,
  TEXT
} from "xpath-analyzer";

import Axes from "../axes";

import Context from "../context";

import XPathNumber from "../types/xpath_number";

import XPathNodeSet from "../types/xpath_node_set";

import { COMMENT_NODE, PROCESSING_INSTRUCTION_NODE, TEXT_NODE } from "../node";

export default function evaluate (rootEvaluator, step, context, type) {
  var nodes;

  var axisEvaluator = Axes[step.axis];

  if (axisEvaluator) {
    nodes = axisEvaluator(rootEvaluator, context, type);
  } else {
    throw new Error("Unknown axis specifier " + step.axis);
  }

  if (step.test.name) {
    var name = step.test.name;

    nodes = nodes.filter(function (node) {
      return (name === "*" && node.getName()) || node.getName() === step.test.name;
    });
  }

  if (step.test.type && step.test.type !== NODE) {
    var nodeType;

    switch (step.test.type) {
      case COMMENT:
        nodeType = COMMENT_NODE;
        break;

      case PROCESSING_INSTRUCTION:
        nodeType = PROCESSING_INSTRUCTION_NODE;
        break;

      case TEXT:
        nodeType = TEXT_NODE;
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
      step.axis === ANCESTOR ||
      step.axis === ANCESTOR_OR_SELF ||
      step.axis === PRECEDING ||
      step.axis === PRECEDING_SIBLING);

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
