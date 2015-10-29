/* eslint-env node */

"use strict";

var NodeSetType = require("../types/node_set_type");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    return new NodeSetType([context.getNode()]);
  }
};
