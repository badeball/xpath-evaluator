import { RELATIVE_LOCATION_PATH } from "xpath-analyzer/lib/expr_type";
import { ANCESTOR_OR_SELF, DESCENDANT_OR_SELF, FOLLOWING_SIBLING } from "xpath-analyzer/lib/axis_specifier";
import { NODE } from "xpath-analyzer/lib/node_type";

export default function evaluate (rootEvaluator, context) {
  return rootEvaluator.evaluate({
    type: RELATIVE_LOCATION_PATH,
    steps: [{
      axis: ANCESTOR_OR_SELF,
      test: {
        type: NODE
      }
    }, {
      axis: FOLLOWING_SIBLING,
      test: {
        type: NODE
      }
    }, {
      axis: DESCENDANT_OR_SELF,
      test: {
        type: NODE
      }
    }]
  }, context);
}
