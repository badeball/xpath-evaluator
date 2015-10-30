"use strict";

var StringType = require("../types/string_type");

module.exports = {
  evaluate: function (context, base, start, length) {
    if (!start) {
      throw new Error("Expected two or three arguments");
    }

    base = base.asString();

    start = Math.round(start.asNumber());

    if (isNaN(start) || start === Infinity || start === -Infinity) {
      return new StringType("");
    }

    if (length) {
      length = Math.round(length.asNumber());

      if (isNaN(length) || length === -Infinity) {
        return new StringType("");
      }
    }

    if (length) {
      return new StringType(base.substring(start - 1, start + length - 1));
    } else {
      return new StringType(base.substring(start - 1));
    }
  }
};
