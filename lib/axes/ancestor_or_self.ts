import { RootEvaluator, XPathResultType } from "../types.d";

import Context from "../context";

import XPathNodeSet from "../types/xpath_node_set";

import Ancestor from "./ancestor";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  var nodes = new XPathNodeSet<T>([context.getNode()]);

  return Ancestor(rootEvaluator, context, type).merge(nodes);
}
