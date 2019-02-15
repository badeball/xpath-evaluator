import { EQUALITY, INEQUALITY } from "xpath-analyzer";

import XPathBoolean from "../types/xpath_boolean";

import XPathNodeSet from "../types/xpath_node_set";

import XPathNumber from "../types/xpath_number";

import XPathString from "../types/xpath_string";

export function compareNodes (type, lhs, rhs, comparator) {
  if (lhs instanceof XPathNodeSet && rhs instanceof XPathNodeSet) {
    var lNode, lIter = lhs.iterator();

    while ((lNode = lIter.next())) {
      var rNode, rIter = rhs.iterator();

      while ((rNode = rIter.next())) {
        if (comparator(lNode.asString(), rNode.asString())) {
          return new XPathBoolean(true);
        }
      }
    }

    return new XPathBoolean(false);
  }

  if (lhs instanceof XPathNodeSet || rhs instanceof XPathNodeSet) {
    var nodeSet, primitive;

    if (lhs instanceof XPathNodeSet) {
      nodeSet = lhs;
      primitive = rhs;
    } else {
      nodeSet = rhs;
      primitive = lhs;
    }

    if (primitive instanceof XPathBoolean) {
      if (comparator(nodeSet.asBoolean(), primitive.asBoolean())) {
        return new XPathBoolean(true);
      }
    } else {
      var node, iter = nodeSet.iterator();

      while ((node = iter.next())) {
        if (primitive instanceof XPathNumber) {
          if (comparator(node.asNumber(), primitive.asNumber())) {
            return new XPathBoolean(true);
          }
        } else if (primitive instanceof XPathString) {
          if (comparator(node.asString(), primitive.asString())) {
            return new XPathBoolean(true);
          }
        } else {
          throw new Error("Unknown value type");
        }
      }
    }

    return new XPathBoolean(false);
  }

  // Neither object is a NodeSet at this point.


  if (type === EQUALITY ||
      type === INEQUALITY) {
    if (lhs instanceof XPathBoolean || rhs instanceof XPathBoolean) {
      if (comparator(lhs.asBoolean(), rhs.asBoolean())) {
        return new XPathBoolean(true);
      }
    } else if (lhs instanceof XPathNumber || rhs instanceof XPathNumber) {
      if (comparator(lhs.asNumber(), rhs.asNumber())) {
        return new XPathBoolean(true);
      }
    } else if (lhs instanceof XPathString || rhs instanceof XPathString) {
      if (comparator(lhs.asString(), rhs.asString())) {
        return new XPathBoolean(true);
      }
    } else {
      throw new Error("Unknown value types");
    }

    return new XPathBoolean(false);
  } else {
    return new XPathBoolean(comparator(lhs.asNumber(), rhs.asNumber()));
  }
}
