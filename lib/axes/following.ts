import { RootEvaluator, XPathResultType } from "../types.d";

import Context from "../context";

import { RELATIVE_LOCATION_PATH, NODE_TYPE_TEST } from "xpath-analyzer";

import { ANCESTOR_OR_SELF, DESCENDANT_OR_SELF, FOLLOWING_SIBLING } from "xpath-analyzer";

import { NODE } from "xpath-analyzer";

import XPathNodeSet from "../types/xpath_node_set";

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  return rootEvaluator.evaluate({
    type: RELATIVE_LOCATION_PATH,
    steps: [{
      axis: ANCESTOR_OR_SELF,
      test: {
        type: NODE_TYPE_TEST,
        name: NODE
      },
      predicates: []
    }, {
      axis: FOLLOWING_SIBLING,
      test: {
        type: NODE_TYPE_TEST,
        name: NODE
      },
      predicates: []
    }, {
      axis: DESCENDANT_OR_SELF,
      test: {
        type: NODE_TYPE_TEST,
        name: NODE
      },
      predicates: []
    }]
  }, context, type) as XPathNodeSet<T>;
}
