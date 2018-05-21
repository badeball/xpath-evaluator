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

/* eslint-disable no-underscore-dangle */
import Number_ from "./evaluators/number";
/* eslint-enable no-underscore-dangle */

import Or from "./evaluators/or";

import Path from "./evaluators/path";

import RelativeLocationPath from "./evaluators/relative_location_path";

import Subtractive from "./evaluators/subtractive";

import Union from "./evaluators/union";

export default {
  [ABSOLUTE_LOCATION_PATH]: AbsoluteLocationPath,
  [ADDITIVE]: Additive,
  [AND]: And,
  [DIVISIONAL]: Divisional,
  [EQUALITY]: Equality,
  [FILTER]: Filter,
  [FUNCTION_CALL]: FunctionCall,
  [GREATER_THAN]: GreaterThan,
  [GREATER_THAN_OR_EQUAL]: GreaterThanOrEqual,
  [INEQUALITY]: Inequality,
  [LESS_THAN]: LessThan,
  [LESS_THAN_OR_EQUAL]: LessThanOrEqual,
  [LITERAL]: Literal,
  [MODULUS]: Modulus,
  [MULTIPLICATIVE]: Multiplicative,
  [NEGATION]: Negation,
  [NUMBER]: Number_,
  [OR]: Or,
  [PATH]: Path,
  [RELATIVE_LOCATION_PATH]: RelativeLocationPath,
  [SUBTRACTIVE]: Subtractive,
  [UNION]: Union
};
