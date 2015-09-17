/* eslint-env node */

"use strict";

var StringType = require("../types/string_type");

module.exports = {
  evaluate: function (context, base, substring) {
    if (!substring) {
      throw new Error("Expected two arguments");
    }

    base = base.asString();

    substring = substring.asString();

    var index = base.indexOf(substring);

    if (index === -1) {
      return new StringType("");
    } else {
      return new StringType(base.substring(index + substring.length));
    }
  }
};
