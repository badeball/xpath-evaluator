/* eslint-disable no-underscore-dangle */

"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

var XPathString = require("../types/xpath_string");

function String_ (context) {
  this.context = context;
}

String_.prototype.evaluate = function (value) {
  if (!value) {
    value = new XPathNodeSet([this.context.getNode()]);
  }

  if (arguments.length > 1) {
    throw new Error("Unknown argument(s)");
  }

  return new XPathString(value.asString());
};

module.exports = String_;
