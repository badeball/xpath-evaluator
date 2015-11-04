"use strict";

var Context = require("../context");

var Node = require("../node");

var RelativeLocationPath = require("./relative_location_path");

function AbsoluteLocationPath () {}

AbsoluteLocationPath.prototype.evaluate = function (rootEvaluator, ast, context, type) {
  if (context.getNode().getNodeType() !== Node.DOCUMENT_NODE) {
    context = new Context(context.getNode().getOwnerDocument());
  }

  return new RelativeLocationPath().evaluate(rootEvaluator, ast, context, type);
};

module.exports = AbsoluteLocationPath;
