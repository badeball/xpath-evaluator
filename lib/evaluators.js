import {
  ABSOLUTE_LOCATION_PATH,
  ADDITIVE,
  AND,
  DIVISIONAL,
  EQUALITY,
  FILTER,
  FUNCTION_CALL,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL,
  INEQUALITY,
  LESS_THAN,
  LESS_THAN_OR_EQUAL,
  LITERAL,
  MODULUS,
  MULTIPLICATIVE,
  NEGATION,
  NUMBER,
  OR,
  PATH,
  RELATIVE_LOCATION_PATH,
  SUBTRACTIVE,
  UNION
} from "xpath-analyzer";

import AbsoluteLocationPath from "./evaluators/absolute_location_path";

import Additive from "./evaluators/additive";

import And from "./evaluators/and";

import Divisional from "./evaluators/divisional";

import Equality from "./evaluators/equality";

import Filter from "./evaluators/filter";

import FunctionCall from "./evaluators/function_call";

import GreaterThan from "./evaluators/greater_than";

import GreaterThanOrEqual from "./evaluators/greater_than_or_equal";

import Inequality from "./evaluators/inequality";

import LessThan from "./evaluators/less_than";

import LessThanOrEqual from "./evaluators/less_than_or_equal";

import Literal from "./evaluators/literal";

import Modulus from "./evaluators/modulus";

import Multiplicative from "./evaluators/multiplicative";

import Negation from "./evaluators/negation";

import Number_ from "./evaluators/number";

import Or from "./evaluators/or";

import Path from "./evaluators/path";

import RelativeLocationPath from "./evaluators/relative_location_path";

import Subtractive from "./evaluators/subtractive";

import Union from "./evaluators/union";

var Evaluators = {};

Evaluators[ABSOLUTE_LOCATION_PATH] = AbsoluteLocationPath;
Evaluators[ADDITIVE] = Additive;
Evaluators[AND] = And;
Evaluators[DIVISIONAL] = Divisional;
Evaluators[EQUALITY] = Equality;
Evaluators[FILTER] = Filter;
Evaluators[FUNCTION_CALL] = FunctionCall;
Evaluators[GREATER_THAN] = GreaterThan;
Evaluators[GREATER_THAN_OR_EQUAL] = GreaterThanOrEqual;
Evaluators[INEQUALITY] = Inequality;
Evaluators[LESS_THAN] = LessThan;
Evaluators[LESS_THAN_OR_EQUAL] = LessThanOrEqual;
Evaluators[LITERAL] = Literal;
Evaluators[MODULUS] = Modulus;
Evaluators[MULTIPLICATIVE] = Multiplicative;
Evaluators[NEGATION] = Negation;
Evaluators[NUMBER] = Number_;
Evaluators[OR] = Or;
Evaluators[PATH] = Path;
Evaluators[RELATIVE_LOCATION_PATH] = RelativeLocationPath;
Evaluators[SUBTRACTIVE] = Subtractive;
Evaluators[UNION] = Union;

export default Evaluators;
