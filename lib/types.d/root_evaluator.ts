import { ExprNode } from "xpath-analyzer";

import Context from "../context";

import { XPathResultType } from "./xpath_result_type";

import { XPathValue } from "./xpath_value";

export interface RootEvaluator<T> {
  evaluate: (ast: ExprNode, context: Context<T>, type: XPathResultType) => XPathValue<T>
}
