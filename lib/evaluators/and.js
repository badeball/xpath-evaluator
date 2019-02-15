import XPathBoolean from "../types/xpath_boolean";

export default function evaluate (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  if (!lhs.asBoolean()) {
    return new XPathBoolean(false);
  }

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathBoolean(rhs.asBoolean());
}
