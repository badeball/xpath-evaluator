"use strict";

var XPathBoolean = require("../types/xpath_boolean");

function StartsWith () {}

StartsWith.prototype.evaluate = function (context, base, substring) {
  if (!substring) {
    throw new Error("Expected two arguments");
  }

  base = base.asString();

  substring = substring.asString();

  var index = base.indexOf(substring);

  return new XPathBoolean(index === 0);
};

module.exports = StartsWith;
