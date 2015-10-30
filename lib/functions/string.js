"use strict";

var NodeSetType = require("../types/node_set_type");

var StringType = require("../types/string_type");

module.exports = {
  evaluate: function (context, value) {
    if (!value) {
      value = new NodeSetType([context.getNode()]);
    }

    if (arguments.length > 2) {
      throw new Error("Unknown argument(s)");
    }

    return new StringType(value.asString());
  }
};
