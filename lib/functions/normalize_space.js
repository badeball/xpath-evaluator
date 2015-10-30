"use strict";

var StringType = require("../types/string_type");

module.exports = {
  evaluate: function (context, value) {
    var string;

    if (!value) {
      string = context.getNode().asString();
    } else {
      if (arguments.length > 2) {
        throw new Error("Unknown argument(s)");
      }

      string = value.asString();
    }

    return new StringType(string.trim().replace(/\s{2,}/g, " "));
  }
};
