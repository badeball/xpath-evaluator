"use strict";

var XPathNumber = require("../types/xpath_number");

function Last () {}

Last.prototype.evaluate = function (context) {
  return new XPathNumber(context.getLast());
};

module.exports = Last;
