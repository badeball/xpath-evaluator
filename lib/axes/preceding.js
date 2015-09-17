/* eslint-env node */

"use strict";

var XPathParser = require("xpath-parser");

var RelativeLocationPath = require("../evaluators/relative_location_path");

module.exports = {
  evaluate: function (context) {
    return RelativeLocationPath.evaluate({steps: [{
      axis: XPathParser.AxisSpecifier.ANCESTOR_OR_SELF,
      test: {
        type: XPathParser.NodeType.NODE
      }
    }, {
      axis: XPathParser.AxisSpecifier.PRECEDING_SIBLING,
      test: {
        type: XPathParser.NodeType.NODE
      }
    }, {
      axis: XPathParser.AxisSpecifier.DESCENDANT_OR_SELF,
      test: {
        type: XPathParser.NodeType.NODE
      }
    }]}, context);
  }
};
