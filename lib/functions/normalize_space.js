"use strict";

var XPathString = require("../types/xpath_string");

function NormalizeSpace (context) {
  this.context = context;
}

NormalizeSpace.prototype.evaluate = function (value) {
  var string;

  if (!value) {
    string = this.context.getNode().asString();
  } else {
    if (arguments.length > 1) {
      throw new Error("Unknown argument(s)");
    }

    string = value.asString();
  }

  return new XPathString(string.trim().replace(/\s{2,}/g, " "));
};

module.exports = NormalizeSpace;
