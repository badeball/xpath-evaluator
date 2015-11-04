"use strict";

var XPathBoolean = require("../types/xpath_boolean");

function False (context) {
  this.context = context;
}

False.prototype.evaluate = function () {
  return new XPathBoolean(false);
};

module.exports = False;
