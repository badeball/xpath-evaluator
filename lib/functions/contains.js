/* eslint-env node */

"use strict";

var XPathBoolean = require("../types/xpath_boolean");

module.exports = {
  evaluate: function (context, base, contains) {
    if (!contains) {
      throw new Error("Expected two arguments");
    }

    base = base.asString();

    contains = contains.asString();

    return new XPathBoolean(base.indexOf(contains) !== -1);
  }
};
