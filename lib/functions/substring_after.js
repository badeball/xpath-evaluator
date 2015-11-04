"use strict";

var XPathString = require("../types/xpath_string");

function SubstringAfter () {}

SubstringAfter.prototype.evaluate = function (context, base, substring) {
  if (!substring) {
    throw new Error("Expected two arguments");
  }

  base = base.asString();

  substring = substring.asString();

  var index = base.indexOf(substring);

  if (index === -1) {
    return new XPathString("");
  } else {
    return new XPathString(base.substring(index + substring.length));
  }
};

module.exports = SubstringAfter;
