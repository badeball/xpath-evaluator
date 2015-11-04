"use strict";

var XPathString = require("../types/xpath_string");

var XPathNodeSet = require("../types/xpath_node_set");

function Name (context) {
  this.context = context;
}

Name.prototype.evaluate = function (nodeset) {
  if (!nodeset) {
    return new XPathString(this.context.getNode().getName());
  } else {
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
  }
};

module.exports = Name;
