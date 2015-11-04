/* eslint-disable no-underscore-dangle */

"use strict";

var XPathBoolean = require("../types/xpath_boolean");

function Boolean_ () {}

Boolean_.prototype.evaluate = function (context, value) {
  if (!value) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 2) {
    throw new Error("Unknown argument(s)");
  }

  return new XPathBoolean(value.asBoolean());
};

module.exports = Boolean_;
