"use strict";

var XPathNumber = require("../types/xpath_number");

function Divisional () {}

Divisional.prototype.evaluate = function (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathNumber(lhs.asNumber() / rhs.asNumber());
};

module.exports = Divisional;
