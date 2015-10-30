"use strict";

var XPathString = require("../types/xpath_string");

var XPathNodeSet = require("../types/xpath_node_set");

module.exports = {
  evaluate: function (context, nodeset) {
    if (!nodeset) {
      return new XPathString(context.getNode().getName());
    } else {
      if (arguments.length > 2) {
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
  }
};
