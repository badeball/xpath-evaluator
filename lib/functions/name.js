"use strict";

var StringType = require("../types/string_type");

var NodeSetType = require("../types/node_set_type");

module.exports = {
  evaluate: function (context, nodeset) {
    if (!nodeset) {
      return new StringType(context.getNode().getName());
    } else {
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
  }
};
