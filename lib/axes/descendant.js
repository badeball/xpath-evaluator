/* eslint-env node */

"use strict";

var Context = require("../context");

var NodeSetType = require("../types/node_set_type");

module.exports = {
  evaluate: function (context) {
    var nodes = new NodeSetType();

    var children = new NodeSetType(context.getNode().getChildNodes());

    var child, iter = children.iterator();

    while ((child = iter.next())) {
      nodes = nodes.push(child);

      nodes = nodes.merge(this.evaluate(new Context(child)));
    }

    return nodes;
  }
};
