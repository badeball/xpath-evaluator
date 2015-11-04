/* eslint-disable no-underscore-dangle */

"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var XPathString = require("../types/xpath_string");

function String_ () {}

String_.prototype.evaluate = function (context, value) {
  if (!value) {
    value = new XPathNodeSet([context.getNode()]);
  }

  if (arguments.length > 2) {
    throw new Error("Unknown argument(s)");
  }

  return new XPathString(value.asString());
};

module.exports = String_;
