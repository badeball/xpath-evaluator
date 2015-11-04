/* eslint-disable no-underscore-dangle */

"use strict";

var XPathBoolean = require("../types/xpath_boolean");

function Boolean_ (context) {
  this.context = context;
}

Boolean_.prototype.evaluate = function (value) {
  if (!value) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 1) {
    throw new Error("Unknown argument(s)");
  }

  return new XPathBoolean(value.asBoolean());
};

module.exports = Boolean_;
