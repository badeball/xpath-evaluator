/* eslint-env node */

"use strict";

var XPathExpression = require("../xpath_expression");

var Context = require("../context");

var NumberType = require("../types/number_type");

var NodeSetType = require("../types/node_set_type");

module.exports = {
  evaluate: function (ast, context, type) {
    var nodes = XPathExpression.evaluate(ast.primary, context, type);

    var node, position = 0, filteredNodes = [], iter = nodes.iterator();

    while ((node = iter.next())) {
      position++;

      var keep = ast.predicates.every(function (predicate) {
        var result = XPathExpression.evaluate(predicate, new Context(node, position, nodes.length()), type);

        if (result === null) {
          return false;
        }

        if (result instanceof NumberType) {
          return result.asNumber() === position;
        } else {
          return result.asBoolean();
        }
      });

      if (keep) {
        filteredNodes.push(node);
      }
    }

    return new NodeSetType(filteredNodes);
  }
};
