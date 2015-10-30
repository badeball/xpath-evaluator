"use strict";

var XPathAnalyzer = require("xpath-analyzer");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    return rootEvaluator.evaluate({
      type: XPathAnalyzer.ExprType.RELATIVE_LOCATION_PATH,
      steps: [{
        axis: XPathAnalyzer.AxisSpecifier.ANCESTOR_OR_SELF,
        test: {
          type: XPathAnalyzer.NodeType.NODE
        }
      }, {
        axis: XPathAnalyzer.AxisSpecifier.FOLLOWING_SIBLING,
        test: {
          type: XPathAnalyzer.NodeType.NODE
        }
      }, {
        axis: XPathAnalyzer.AxisSpecifier.DESCENDANT_OR_SELF,
        test: {
          type: XPathAnalyzer.NodeType.NODE
        }
      }]
    }, context);
  }
};
