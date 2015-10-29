/* eslint-env node */

"use strict";

var Context = require("../context");

var XPathNodeSet = require("../types/xpath_node_set");

module.exports = {
  evaluate: function (rootEvaluator, context) {
    var nodes = new XPathNodeSet();

    var children = new XPathNodeSet(context.getNode().getChildNodes());

    var child, iter = children.iterator();

    while ((child = iter.next())) {
      nodes = nodes.push(child);

      nodes = nodes.merge(this.evaluate(rootEvaluator, new Context(child)));
    }

    return nodes;
  }
};
