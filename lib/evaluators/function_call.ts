import {
  FunctionNode
} from "xpath-analyzer";

import {
  BOOLEAN,
  CEILING,
  CONCAT,
  CONTAINS,
  COUNT,
  FALSE,
  FLOOR,
  ID,
  LAST,
  LOCAL_NAME,
  NAME,
  NORMALIZE_SPACE,
  NOT,
  NUMBER,
  POSITION,
  ROUND,
  STARTS_WITH,
  STRING_LENGTH,
  STRING,
  SUBSTRING_AFTER,
  SUBSTRING_BEFORE,
  SUBSTRING,
  SUM,
  TRANSLATE,
  TRUE
} from "xpath-analyzer";

import {
  RootEvaluator,
  XPathResultType,
  XPathValue
} from "../types.d";

import Context from "../context";

import {
  Boolean_,
  Ceiling,
  Concat,
  Contains,
  Count,
  False,
  Floor,
  Id,
  Last,
  LocalName,
  Name,
  NormalizeSpace,
  Not,
  Number_,
  Position,
  Round,
  StartsWith,
  StringLength,
  String_,
  SubstringAfter,
  SubstringBefore,
  Substring,
  Sum,
  Translate,
  True
} from "../functions";

function getFunctionEvaluator<T> (name: FunctionNode["name"]): (context: Context<T>, ...args: XPathValue<T>[]) => XPathValue<T> {
  switch (name) {
    case BOOLEAN: return Boolean_;
    case CEILING: return Ceiling;
    case CONCAT: return Concat;
    case CONTAINS: return Contains;
    case COUNT: return Count;
    case FALSE: return False;
    case FLOOR: return Floor;
    case ID: return Id;
    case LAST: return Last;
    case LOCAL_NAME: return LocalName;
    case NAME: return Name;
    case NORMALIZE_SPACE: return NormalizeSpace;
    case NOT: return Not;
    case NUMBER: return Number_;
    case POSITION: return Position;
    case ROUND: return Round;
    case STARTS_WITH: return StartsWith;
    case STRING_LENGTH: return StringLength;
    case STRING: return String_;
    case SUBSTRING_AFTER: return SubstringAfter;
    case SUBSTRING_BEFORE: return SubstringBefore;
    case SUBSTRING: return Substring;
    case SUM: return Sum;
    case TRANSLATE: return Translate;
    case TRUE: return True;
  }
}

export default function evaluate<T> (
  rootEvaluator: RootEvaluator<T>,
  ast: FunctionNode,
  context: Context<T>,
  type: XPathResultType
): XPathValue<T> {
  var args = ast.args.map(function (arg) {
    return rootEvaluator.evaluate(arg, context, type);
  });

  return getFunctionEvaluator<T>(ast.name)(context, ...args);
}
