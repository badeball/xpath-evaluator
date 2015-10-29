/* eslint-env node */

"use strict";

var XPathNumber = require("../types/xpath_number");

module.exports = {
  evaluate: function (context, number) {
    if (!number) {
      throw new Error("Missing argument");
    }

    if (arguments.length > 2) {
      throw new Error("Unknown argument(s)");
    }

    if (!(number instanceof XPathNumber)) {
      throw new Error("Wrong type of argument");
    }

    return new XPathNumber(Math.ceil(number.asNumber()));
  }
};
