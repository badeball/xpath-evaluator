/* eslint-env node */

"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var XPathString = require("../types/xpath_string");

module.exports = {
  evaluate: function (context, value) {
    if (!value) {
      value = new XPathNodeSet([context.getNode()]);
    }

    if (arguments.length > 2) {
      throw new Error("Unknown argument(s)");
    }

    return new XPathString(value.asString());
  }
};
