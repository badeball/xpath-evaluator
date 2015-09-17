/* eslint-env node */

"use strict";

var BooleanType = require("../types/boolean_type");

module.exports = {
  evaluate: function (context, base, substring) {
    if (!substring) {
      throw new Error("Expected two arguments");
    }

    base = base.asString();

    substring = substring.asString();

    var index = base.indexOf(substring);

    return new BooleanType(index === 0);
  }
};
