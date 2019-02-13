import Context from "../context";

import XPathNumber from "../types/xpath_number";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate (rootEvaluator, ast, context, type) {
  var nodes = rootEvaluator.evaluate(ast.primary, context, type);

  var node, position = 0, lenght = nodes.length(), iter = nodes.iterator();

  while ((node = iter.next())) {
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
