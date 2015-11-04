"use strict";

var XPathString = require("../types/xpath_string");

var XPathNumber = require("../types/xpath_number");

module.exports = {
  evaluate: function (context, string) {
    if (!string) {
      string = context.getNode().asString();
    } else {
      if (arguments.length > 2) {
        throw new Error("Unknown argument(s)");
      }

      if (!(string instanceof XPathString)) {
        throw new Error("Wrong type of argument");
      }

      string = string.asString();
    }

    return new XPathNumber(string.length);
  }
};
