"use strict";

var XPathNumber = require("../types/xpath_number");

function Negation () {}

Negation.prototype.evaluate = function (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  return new XPathNumber(-lhs.asNumber());
};

module.exports = Negation;
