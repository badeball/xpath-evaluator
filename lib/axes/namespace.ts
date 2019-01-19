import { RootEvaluator, XPathResultType } from "../types.d";

import Context from "../context";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  throw new Error("Namespace axis is not implemented");
}
