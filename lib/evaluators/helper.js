/* eslint-env node */

"use strict";

var XPathAnalyzer = require("xpath-analyzer");

var BooleanType = require("../types/boolean_type");

var NodeSetType = require("../types/node_set_type");

var NumberType = require("../types/number_type");

var StringType = require("../types/string_type");

module.exports = {
  compareNodes: function (type, lhs, rhs, comparator) {
    if (lhs instanceof NodeSetType && rhs instanceof NodeSetType) {
      var lNode, lIter = lhs.iterator();

      while ((lNode = lIter.next())) {
        var rNode, rIter = rhs.iterator();

        while ((rNode = rIter.next())) {
          if (comparator(lNode.asString(), rNode.asString())) {
            return new BooleanType(true);
          }
        }
      }

      return new BooleanType(false);
    }

    if (lhs instanceof NodeSetType || rhs instanceof NodeSetType) {
      var nodeSet, primitive;

      if (lhs instanceof NodeSetType) {
        nodeSet = lhs;
        primitive = rhs;
      } else {
        nodeSet = rhs;
        primitive = lhs;
      }

      var node, iter = nodeSet.iterator();

      while ((node = iter.next())) {
        if (primitive instanceof NumberType) {
          if (comparator(node.asNumber(), primitive.asNumber())) {
            return new BooleanType(true);
          }
        } else if (primitive instanceof BooleanType) {
          if (comparator(node.asBoolean(), primitive.asBoolean())) {
            return new BooleanType(true);
          }
        } else if (primitive instanceof StringType) {
          if (comparator(node.asString(), primitive.asString())) {
            return new BooleanType(true);
          }
        } else {
          throw new Error("Unknown value type");
        }
      }

      return new BooleanType(false);
    }

    // Neither object is a NodeSet at this point.


    if (type === XPathAnalyzer.ExprType.EQUALITY ||
        type === XPathAnalyzer.ExprType.INEQUALITY) {
      if (lhs instanceof BooleanType || rhs instanceof BooleanType) {
        if (comparator(lhs.asBoolean(), rhs.asBoolean())) {
          return new BooleanType(true);
        }
      } else if (rhs instanceof NumberType || rhs instanceof NumberType) {
        if (comparator(lhs.asNumber(), rhs.asNumber())) {
          return new BooleanType(true);
        }
      } else if (rhs instanceof StringType || rhs instanceof StringType) {
        if (comparator(lhs.asString(), rhs.asString())) {
          return new BooleanType(true);
        }
      } else {
        throw new Error("Unknown value types");
      }

      return new BooleanType(false);
    } else {
      return new BooleanType(comparator(lhs.asNumber(), rhs.asNumber()));
    }
  }
};
