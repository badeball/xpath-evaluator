"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var XPathNumber = require("../types/xpath_number");

function Count (context) {
  this.context = context;
}

Count.prototype.evaluate = function (nodeset) {
  if (!nodeset) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 1) {
    throw new Error("Unknown argument(s)");
  }

  if (!(nodeset instanceof XPathNodeSet)) {
    throw new Error("Wrong type of argument");
  }

  return new XPathNumber(nodeset.length());
};

module.exports = Count;
