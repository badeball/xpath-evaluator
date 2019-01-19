import {
  RelativeLocationPathNode
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import Context from "../context";

import XPathNodeSet from "../types/xpath_node_set";

import Step from "./step";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: RelativeLocationPathNode,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  var nodeSet = new XPathNodeSet<T>([context.getNode()]),
      nextNodeSet = new XPathNodeSet<T>();

  if (ast.steps) {
    for (var i = 0; i < ast.steps.length; i++) {
      for (var node of nodeSet.iterator()) {
        var stepResult = Step(rootEvaluator, ast.steps[i], new Context(node, 1, 1), type);

        nextNodeSet = nextNodeSet.merge(stepResult);
      }

      nodeSet = nextNodeSet;
      nextNodeSet = new XPathNodeSet<T>();
    }
  }

  return nodeSet;
}
