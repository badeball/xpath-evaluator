"use strict";

var NodeSetType = require("../types/node_set_type");

var NumberType = require("../types/number_type");

module.exports = {
  evaluate: function (context, nodeset) {
    if (!nodeset) {
      throw new Error("Missing argument");
    }

    if (arguments.length > 2) {
      throw new Error("Unknown argument(s)");
    }

    if (!(nodeset instanceof NodeSetType)) {
      throw new Error("Wrong type of argument");
    }

    return new NumberType(nodeset.length());
  }
};
