/* eslint-env node */

"use strict";

var XPathAnalyzer = require("xpath-analyzer");

var RelativeLocationPath = require("../evaluators/relative_location_path");

module.exports = {
  evaluate: function (context) {
    return RelativeLocationPath.evaluate({steps: [{
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
    }]}, context);
  }
};
