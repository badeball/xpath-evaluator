"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var XPathString = require("../types/xpath_number");

function LocalName (context) {
  this.context = context;
}

LocalName.prototype.evaluate = function (nodeset) {
  if (!nodeset) {
    nodeset = new XPathNodeSet([this.context.getNode()]);
  }

  if (arguments.length > 1) {
    throw new Error("Unknown argument(s)");
  }

  if (!(nodeset instanceof XPathNodeSet)) {
    throw new Error("Wrong type of argument");
  }

  if (nodeset.empty()) {
    return new XPathString("");
  } else {
    return new XPathString(nodeset.first().getName());
  }
};

module.exports = LocalName;
