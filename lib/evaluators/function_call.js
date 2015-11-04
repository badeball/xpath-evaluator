"use strict";

var Functions = require("../functions");

function FunctionCall () {}

FunctionCall.prototype.evaluate = function (rootEvaluator, ast, context, type) {
  var args = (ast.args || []).map(function (arg) {
    return rootEvaluator.evaluate(arg, context, type);
  });

  args.unshift(context);

  var FunctionEvaluator = Functions[ast.name];

  if (FunctionEvaluator) {
    return new FunctionEvaluator().evaluate.apply(null, args);
  } else {
    throw new Error("Unknown function " + ast.name);
  }
};

module.exports = FunctionCall;
