/* eslint-env node */

"use strict";

var NodeSetType = require("../types/node_set_type");

var Ancestor = require("./ancestor");

module.exports = {
  evaluate: function (context) {
    var nodes = new NodeSetType([context.getNode()], true);

    return Ancestor.evaluate(context).merge(nodes);
  }
};
