/* eslint-env node */

"use strict";

var Context = require("../context");

var XPathNumber = require("../types/xpath_number");

var XPathNodeSet = require("../types/xpath_node_set");

module.exports = {
  evaluate: function (rootEvaluator, ast, context, type) {
    var nodes = rootEvaluator.evaluate(ast.primary, context, type);

    var node, position = 0, filteredNodes = [], iter = nodes.iterator();

    while ((node = iter.next())) {
      position++;

      var keep = ast.predicates.every(function (predicate) {
        var result = rootEvaluator.evaluate(predicate, new Context(node, position, nodes.length()), type);

        if (result === null) {
          return false;
        }

        if (result instanceof XPathNumber) {
          return result.asNumber() === position;
        } else {
          return result.asBoolean();
        }
      });

      if (keep) {
        filteredNodes.push(node);
      }
    }

    return new XPathNodeSet(filteredNodes);
  }
};
