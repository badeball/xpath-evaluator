"use strict";

var NumberType = require("../types/number_type");

module.exports = {
  evaluate: function (context, value) {
    if (!value) {
      throw new Error("Missing argument");
    }

    if (arguments.length > 2) {
      throw new Error("Unknown argument(s)");
    }

    return new NumberType(value.asNumber());
  }
};
