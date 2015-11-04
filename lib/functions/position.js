"use strict";

var XPathNumber = require("../types/xpath_number");

function Position (context) {
  this.context = context;
}

Position.prototype.evaluate = function () {
  return new XPathNumber(this.context.getPosition());
};

module.exports = Position;
