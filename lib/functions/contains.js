"use strict";

var BooleanType = require("../types/boolean_type");

module.exports = {
  evaluate: function (context, base, contains) {
    if (!contains) {
      throw new Error("Expected two arguments");
    }

    base = base.asString();

    contains = contains.asString();

    return new BooleanType(base.indexOf(contains) !== -1);
  }
};
