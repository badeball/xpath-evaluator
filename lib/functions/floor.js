"use strict";

var NumberType = require("../types/number_type");

module.exports = {
  evaluate: function (context, number) {
    if (!number) {
      throw new Error("Missing argument");
    }

    if (arguments.length > 2) {
      throw new Error("Unknown argument(s)");
    }

    if (!(number instanceof NumberType)) {
      throw new Error("Wrong type of argument");
    }

    return new NumberType(Math.floor(number.asNumber()));
  }
};
