import { ExprNode, EQUALITY, INEQUALITY } from "xpath-analyzer";

import { XPathValue } from "../types.d";

import XPathBoolean from "../types/xpath_boolean";

import XPathNodeSet from "../types/xpath_node_set";

import XPathNumber from "../types/xpath_number";

import XPathString from "../types/xpath_string";

export function compareNodes<T> (
  type: ExprNode["type"],
  lhs: XPathValue<T>,
  rhs: XPathValue<T>,
  comparator: <N>(a: N, b: N) => boolean
): XPathBoolean {
  if (lhs instanceof XPathNodeSet && rhs instanceof XPathNodeSet) {
    for (var lNode of lhs.iterator()) {
      for (var rNode of rhs.iterator()) {
        if (comparator<string>(lNode.asString(), rNode.asString())) {
          return new XPathBoolean(true);
        }
      }
    }

    return new XPathBoolean(false);
  }

  if (lhs instanceof XPathNodeSet || rhs instanceof XPathNodeSet) {
    var nodeSet: XPathNodeSet<T>, primitive;

    if (lhs instanceof XPathNodeSet) {
      nodeSet = lhs;
      primitive = rhs;
    } else {
      nodeSet = rhs as XPathNodeSet<T>;
      primitive = lhs;
    }

    if (primitive instanceof XPathBoolean) {
      if (comparator<boolean>(nodeSet.asBoolean(), primitive.asBoolean())) {
        return new XPathBoolean(true);
      }
    } else {
      for (var node of nodeSet.iterator()) {
        if (primitive instanceof XPathNumber) {
          if (comparator<number>(node.asNumber(), primitive.asNumber())) {
            return new XPathBoolean(true);
          }
        } else if (primitive instanceof XPathString) {
          if (comparator<string>(node.asString(), primitive.asString())) {
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
