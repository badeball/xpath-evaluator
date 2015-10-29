/* eslint-env node */

"use strict";

var XPathBoolean = require("../types/xpath_boolean");

module.exports = {
  evaluate: function (context, value) {
    if (!value) {
      throw new Error("Missing argument");
    }

    if (arguments.length > 2) {
      throw new Error("Unknown argument(s)");
    }

    return new XPathBoolean(!value.asBoolean());
  }
};
