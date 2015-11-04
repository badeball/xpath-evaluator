"use strict";

var XPathBoolean = require("../types/xpath_boolean");

function Contains (context) {
  this.context = context;
}

Contains.prototype.evaluate = function (base, contains) {
   if (!contains) {
    throw new Error("Expected two arguments");
  }

  base = base.asString();

  contains = contains.asString();

  return new XPathBoolean(base.indexOf(contains) !== -1);
};

module.exports = Contains;
