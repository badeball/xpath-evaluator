import XPathString from "../types/xpath_string";

export default function evaluate (rootEvaluator, ast) {
  return new XPathString(ast.string);
}
