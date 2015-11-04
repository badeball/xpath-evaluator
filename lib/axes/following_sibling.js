"use strict";

var XPathNodeSet = require("../types/xpath_node_set");

function FollowingSibling () {}

FollowingSibling.prototype.evaluate = function (rootEvaluator, context) {
  return new XPathNodeSet(context.getNode().getFollowingSiblings());
};

module.exports = FollowingSibling;
