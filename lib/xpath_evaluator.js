"use strict";

var XPathExpression = require("./xpath_expression");

var XPathResult = require("./xpath_result");

var Adapter = require("./adapter");

var Node = require("./node");

function throwNotImplemented () {
  throw new Error("Namespaces are not implemented");
}

module.exports = {
  evaluate: function (expression, context, nsResolver, type) {
    if (nsResolver) {
      throwNotImplemented();
    }

    var value = this.createExpression(expression).evaluate(context, type, Adapter.getAdapter());

    return new XPathResult(type, value);
  },

  createExpression: function (expression, nsResolver) {
    if (nsResolver) {
      throwNotImplemented();
    }

    return new XPathExpression(expression);
  },

  createNSResolver: function () {
    throwNotImplemented();
  },

  setAdapter: function (adapter) {
    Adapter.setAdapter(adapter);
  },

  XPathResult: XPathResult,

  Node: Node
};
