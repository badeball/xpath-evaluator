"use strict";

var Context = require("../context");

var RelativeLocationPath = require("./relative_location_path");

function Path () {}

Path.prototype.evaluate = function (rootEvaluator, ast, context, type) {
  var nodes = rootEvaluator.evaluate(ast.filter, context, type);

  if (ast.steps) {
    var nodeSets = [], node, iter = nodes.iterator();

    while ((node = iter.next())) {
      nodeSets.push(new RelativeLocationPath().evaluate(rootEvaluator, ast, new Context(node), type));
    }

    nodes = nodeSets.reduce(function (previousValue, currentValue) {
      return previousValue.merge(currentValue);
    });
  }

  return nodes;
};

module.exports = Path;
