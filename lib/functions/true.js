"use strict";

var XPathBoolean = require("../types/xpath_boolean");

function True (context) {
  this.context = context;
}

True.prototype.evaluate = function () {
  return new XPathBoolean(true);
};

module.exports = True;
