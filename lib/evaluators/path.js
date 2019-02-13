import Context from "../context";

import RelativeLocationPath from "./relative_location_path";

export default function evaluate (rootEvaluator, ast, context, type) {
  var nodes = rootEvaluator.evaluate(ast.filter, context, type);

  if (ast.steps) {
    var nodeSets = [], node, iter = nodes.iterator();

    while ((node = iter.next())) {
      nodeSets.push(RelativeLocationPath(rootEvaluator, ast, new Context(node, 1, 1), type));
    }

    nodes = nodeSets.reduce(function (previousValue, currentValue) {
      return previousValue.merge(currentValue);
    });
  }

  return nodes;
}
