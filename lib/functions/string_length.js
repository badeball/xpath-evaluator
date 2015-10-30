"use strict";

var StringType = require("../types/string_type");

var NumberType = require("../types/number_type");

module.exports = {
  evaluate: function (context, string) {
    if (!string) {
      string = context.getNode().asString();
    } else {
      if (arguments.length > 2) {
        throw new Error("Unknown argument(s)");
      }

      if (!(string instanceof StringType)) {
        throw new Error("Wrong type of argument");
      }

      string = string.asString();
    }

    return new NumberType(string.length);
  }
};
