"use strict";

var XPathString = require("../types/xpath_string");

function Literal () {}

Literal.prototype.evaluate = function (rootEvaluator, ast) {
  return new XPathString(ast.string);
};

module.exports = Literal;
