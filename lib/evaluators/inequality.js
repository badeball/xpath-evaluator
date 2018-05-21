import * as Helper from "./helper";

export default function evaluate (rootEvaluator, ast, context, type) {
  return Helper.compareNodes(
    ast.type,
    rootEvaluator.evaluate(ast.lhs, context, type),
    rootEvaluator.evaluate(ast.rhs, context, type),
    function (lhs, rhs) {
      return lhs !== rhs;
    }
  );
}
