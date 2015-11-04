"use strict";

var Helper = require("./helper");

function Inequality () {}

Inequality.prototype.evaluate = function (rootEvaluator, ast, context, type) {
  return Helper.compareNodes(
    ast.type,
    rootEvaluator.evaluate(ast.lhs, context, type),
    rootEvaluator.evaluate(ast.rhs, context, type),
    function (lhs, rhs) {
      return lhs !== rhs;
    }
  );
};

module.exports = Inequality;
