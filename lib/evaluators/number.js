import XPathNumber from "../types/xpath_number";

export default function evaluate (rootEvaluator, ast) {
  return new XPathNumber(ast.number);
}
