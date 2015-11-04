"use strict";

var XPathNumber = require("../types/xpath_number");

function Ceiling (context) {
  this.context = context;
}

Ceiling.prototype.evaluate = function (number) {
  if (!number) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 1) {
    throw new Error("Unknown argument(s)");
  }

  if (!(number instanceof XPathNumber)) {
    throw new Error("Wrong type of argument");
  }

  return new XPathNumber(Math.ceil(number.asNumber()));
};

module.exports = Ceiling;
