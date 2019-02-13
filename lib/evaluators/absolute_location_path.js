import Context from "../context";

import { DOCUMENT_NODE } from "../node";

import RelativeLocationPath from "./relative_location_path";

export default function evaluate (rootEvaluator, ast, context, type) {
  if (context.getNode().getNodeType() !== DOCUMENT_NODE) {
    context = new Context(context.getNode().getOwnerDocument(), 1, 1);
  }

  return RelativeLocationPath(rootEvaluator, ast, context, type);
}
