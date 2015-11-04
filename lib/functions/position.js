"use strict";

var XPathNumber = require("../types/xpath_number");

function Position () {}

Position.prototype.evaluate = function (context) {
  return new XPathNumber(context.getPosition());
};

module.exports = Position;
