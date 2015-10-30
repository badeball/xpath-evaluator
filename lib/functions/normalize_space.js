"use strict";

var XPathString = require("../types/xpath_string");

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

    return new XPathString(string.trim().replace(/\s{2,}/g, " "));
  }
};
