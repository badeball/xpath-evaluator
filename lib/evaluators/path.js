/* eslint-env node */

"use strict";

var XPathExpression = require("../xpath_expression");

var Context = require("../context");

var RelativeLocationPath = require("./relative_location_path");

module.exports = {
  evaluate: function (ast, context, type) {
    var nodes = XPathExpression.evaluate(ast.filter, context, type);

    if (ast.steps) {
      var nodeSets = [], node, iter = nodes.iterator();

      while ((node = iter.next())) {
        nodeSets.push(RelativeLocationPath.evaluate(ast, new Context(node), type));
      }

      nodes = nodeSets.reduce(function (previousValue, currentValue) {
        return previousValue.merge(currentValue);
      });
    }

    return nodes;
  }
};
