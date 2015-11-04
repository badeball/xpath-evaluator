"use strict";

var XPathString = require("../types/xpath_string");

var XPathNumber = require("../types/xpath_number");

function StartsWith (context) {
  this.context = context;
}

StartsWith.prototype.evaluate = function (string) {
  if (!string) {
    string = this.context.getNode().asString();
  } else {
    if (arguments.length > 1) {
      throw new Error("Unknown argument(s)");
    }

    if (!(string instanceof XPathString)) {
      throw new Error("Wrong type of argument");
    }

    string = string.asString();
  }

  return new XPathNumber(string.length);
};

module.exports = StartsWith;
