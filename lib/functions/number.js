/* eslint-disable no-underscore-dangle */

"use strict";

var XPathNumber = require("../types/xpath_number");

function Number_ () {}

Number_.prototype.evaluate = function (context, value) {
  if (!value) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 2) {
    throw new Error("Unknown argument(s)");
  }

  return new XPathNumber(value.asNumber());
};

module.exports = Number_;
