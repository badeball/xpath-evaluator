"use strict";

var XPathString = require("../types/xpath_string");

function Concat () {}

Concat.prototype.evaluate = function () {
  var args = [].slice.call(arguments);

  args.shift();

  if (args.length === 0) {
    throw new Error("Expected some arguments");
  }

  args = args.map(function (arg) {
    return arg.asString();
  });

  return new XPathString(args.join(""));
};

module.exports = Concat;
