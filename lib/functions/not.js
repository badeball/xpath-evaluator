"use strict";

var XPathBoolean = require("../types/xpath_boolean");

function Not (context) {
  this.context = context;
}

Not.prototype.evaluate = function (value) {
  if (!value) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 1) {
    throw new Error("Unknown argument(s)");
  }

  return new XPathBoolean(!value.asBoolean());
};

module.exports = Not;
