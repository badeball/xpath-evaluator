import Context from "../context";

import XPathNodeSet from "../types/xpath_node_set";

import Step from "./step";

export default function evaluate (rootEvaluator, ast, context, type) {
  var nodeSet = new XPathNodeSet([context.getNode()]),
      nextNodeSet = new XPathNodeSet();

  if (ast.steps) {
    for (var i = 0; i < ast.steps.length; i++) {
      for (var node of nodeSet.iterator()) {
        var stepResult = Step(rootEvaluator, ast.steps[i], new Context(node, 1, 1), type);

        nextNodeSet = nextNodeSet.merge(stepResult);
      }

      nodeSet = nextNodeSet;
      nextNodeSet = new XPathNodeSet();
    }
  }

  return nodeSet;
}
