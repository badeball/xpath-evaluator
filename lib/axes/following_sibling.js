/* eslint-env node */

"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    return new XPathNodeSet(context.getNode().getFollowingSiblings());
  }
};
