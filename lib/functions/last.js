"use strict";

var XPathNumber = require("../types/xpath_number");

function Last (context) {
  this.context = context;
}

Last.prototype.evaluate = function () {
  return new XPathNumber(this.context.getLast());
};

module.exports = Last;
