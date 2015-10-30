/* eslint-env node */

"use strict";

var NodeSetType = require("../types/node_set_type");

var StringType = require("../types/string_type");

module.exports = {
  evaluate: function (context, nodeset) {
    if (!nodeset) {
      nodeset = new NodeSetType([context.getNode()]);
    }

    if (arguments.length > 2) {
      throw new Error("Unknown argument(s)");
    }

    if (!(nodeset instanceof NodeSetType)) {
      throw new Error("Wrong type of argument");
    }

    if (nodeset.empty()) {
      return new StringType("");
    } else {
      return new StringType(nodeset.first().getName());
    }
  }
};
