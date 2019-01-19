import {
  StepNode
} from "xpath-analyzer";

import {
  ANCESTOR,
  ANCESTOR_OR_SELF,
  ATTRIBUTE,
  CHILD,
  DESCENDANT,
  DESCENDANT_OR_SELF,
  FOLLOWING,
  FOLLOWING_SIBLING,
  NAMESPACE,
  PARENT,
  PRECEDING,
  PRECEDING_SIBLING,
  SELF
} from "xpath-analyzer";

import {
  COMMENT,
  NODE,
  PROCESSING_INSTRUCTION,
  TEXT
} from "xpath-analyzer";

import {
  NODE_NAME_TEST,
  NODE_TYPE_TEST,
  PROCESSING_INSTRUCTION_TEST
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType
} from "../types.d";

import {
  Ancestor,
  AncestorOrSelf,
  Attribute,
  Child,
  Descendant,
  DescendantOrSelf,
  Following,
  FollowingSibling,
  Namespace,
  Parent,
  Preceding,
  PrecedingSibling,
  Self
} from "../axes";

import Context from "../context";

import XPathNumber from "../types/xpath_number";

import XPathNodeSet from "../types/xpath_node_set";

import { COMMENT_NODE, PROCESSING_INSTRUCTION_NODE, TEXT_NODE } from "../node";

function getAxisEvaluator(axis: StepNode["axis"]) {
  switch (axis) {
    case ANCESTOR: return Ancestor;
    case ANCESTOR_OR_SELF: return AncestorOrSelf;
    case ATTRIBUTE: return Attribute;
    case CHILD: return Child;
    case DESCENDANT: return Descendant;
    case DESCENDANT_OR_SELF: return DescendantOrSelf;
    case FOLLOWING: return Following;
    case FOLLOWING_SIBLING: return FollowingSibling;
    case NAMESPACE: return Namespace;
    case PARENT: return Parent;
    case PRECEDING: return Preceding;
    case PRECEDING_SIBLING: return PrecedingSibling;
    case SELF: return Self;
  }
}

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: StepNode,
  context: Context<T>,
  type: XPathResultType
): XPathNodeSet<T> {
  var nodes = getAxisEvaluator(ast.axis)(rootEvaluator, context, type);

  var test = ast.test;

  if (test.type === NODE_NAME_TEST || (test.type == PROCESSING_INSTRUCTION_TEST && test.name)) {
    var name = ast.test.name;

    nodes = nodes.filter(function (node) {
      return (name === "*" && !!node.getName()) || node.getName() === ast.test.name;
    });
  }

  if ((test.type === NODE_TYPE_TEST && test.name !== NODE) || test.type === PROCESSING_INSTRUCTION_TEST) {
    var nodeType: number;

    if (test.type === NODE_TYPE_TEST) {
      switch (test.name) {
        case COMMENT:
          nodeType = COMMENT_NODE;
          break;

        case PROCESSING_INSTRUCTION:
          nodeType = PROCESSING_INSTRUCTION_NODE;
          break;

        case TEXT:
          nodeType = TEXT_NODE;
          break;

        default:
          throw new Error("Unknown node nodeType " + test.name);
      }
    } else {
      nodeType = PROCESSING_INSTRUCTION_NODE;
    }

    nodes = nodes.filter(function (node) {
      return node.getNodeType() === nodeType;
    });
  }

  if (ast.predicates.length > 0) {
    var reversed = (
      ast.axis === ANCESTOR ||
      ast.axis === ANCESTOR_OR_SELF ||
      ast.axis === PRECEDING ||
      ast.axis === PRECEDING_SIBLING);

    var position = 0, length = nodes.length(), iter = nodes.iterator(reversed);

    for (var node of iter) {
      position++;

      var keep = ast.predicates.every(function (predicate) {
        var result = rootEvaluator.evaluate(predicate, new Context(node, position, length), type);

        if (result === null) {
          return false;
        }

        if (result instanceof XPathNumber) {
          return result.asNumber() === position;
        } else {
          return result.asBoolean();
        }
      });

      if (!keep) {
        iter.remove();
      }
    }
  }

  return nodes;
}
