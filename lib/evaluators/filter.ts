import {
  FilterNode
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import Context from "../context";

import XPathNumber from "../types/xpath_number";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: FilterNode,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  const nodes = rootEvaluator.evaluate(ast.primary, context, type);

  if (!(nodes instanceof XPathNodeSet)) {
    throw new Error("Predicates can only be used when primary expression yields a node-set");
  }

  var position = 0, length = nodes.length(), iter = nodes.iterator();

  for (var node of iter) {
    position++;

    var keep = ast.predicates.every(function (predicate) {
      var result = rootEvaluator.evaluate(predicate, new Context(node, position, length), type);

      if (result === null) {
        return false;
      }

      if (result instanceof XPathNumber) {
        return result.asNumber() === position;
      } else {
        return result.asBoolean();
      }
    });

    if (!keep) {
      iter.remove();
    }
  }

  return nodes;
}
