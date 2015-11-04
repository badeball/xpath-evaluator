"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var XPathNumber = require("../types/xpath_number");

function Sum (context) {
  this.context = context;
}

Sum.prototype.evaluate = function (nodeset) {
  if (!nodeset) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 1) {
    throw new Error("Unknown argument(s)");
  }

  if (!(nodeset instanceof XPathNodeSet)) {
    throw new Error("Wrong type of argument");
  }

  var sum = 0, node, iter = nodeset.iterator();

  while ((node = iter.next())) {
    sum = sum + node.asNumber();
  }

  return new XPathNumber(sum);
};

module.exports = Sum;
