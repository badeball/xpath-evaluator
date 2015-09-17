/* eslint-env node */

module.exports = {};

var XPathParser = require("xpath-parser");

var AbsoluteLocationPath = require("./evaluators/absolute_location_path");

var Additive = require("./evaluators/additive");

var And = require("./evaluators/and");

var Divisional = require("./evaluators/divisional");

var Equality = require("./evaluators/equality");

var Filter = require("./evaluators/filter");

var FunctionCall = require("./evaluators/function_call");

var GreaterThan = require("./evaluators/greater_than");

var GreaterThanOrEqual = require("./evaluators/greater_than_or_equal");

var Inequality = require("./evaluators/inequality");

var LessThan = require("./evaluators/less_than");

var LessThanOrEqual = require("./evaluators/less_than_or_equal");

var Literal = require("./evaluators/literal");

var Modulus = require("./evaluators/modulus");

var Multiplicative = require("./evaluators/multiplicative");

var Negation = require("./evaluators/negation");

/* eslint-disable no-underscore-dangle */
var Number_ = require("./evaluators/number");
/* eslint-enable no-underscore-dangle */

var Or = require("./evaluators/or");

var Path = require("./evaluators/path");

var RelativeLocationPath = require("./evaluators/relative_location_path");

var Subtractive = require("./evaluators/subtractive");

var Union = require("./evaluators/union");

module.exports[XPathParser.ExprType.ABSOLUTE_LOCATION_PATH] = AbsoluteLocationPath;
module.exports[XPathParser.ExprType.ADDITIVE] = Additive;
module.exports[XPathParser.ExprType.AND] = And;
module.exports[XPathParser.ExprType.DIVISIONAL] = Divisional;
module.exports[XPathParser.ExprType.EQUALITY] = Equality;
module.exports[XPathParser.ExprType.FILTER] = Filter;
module.exports[XPathParser.ExprType.FUNCTION_CALL] = FunctionCall;
module.exports[XPathParser.ExprType.GREATER_THAN] = GreaterThan;
module.exports[XPathParser.ExprType.GREATER_THAN_OR_EQUAL] = GreaterThanOrEqual;
module.exports[XPathParser.ExprType.INEQUALITY] = Inequality;
module.exports[XPathParser.ExprType.LESS_THAN] = LessThan;
module.exports[XPathParser.ExprType.LESS_THAN_OR_EQUAL] = LessThanOrEqual;
module.exports[XPathParser.ExprType.LITERAL] = Literal;
module.exports[XPathParser.ExprType.MODULUS] = Modulus;
module.exports[XPathParser.ExprType.MULTIPLICATIVE] = Multiplicative;
module.exports[XPathParser.ExprType.NEGATION] = Negation;
module.exports[XPathParser.ExprType.NUMBER] = Number_;
module.exports[XPathParser.ExprType.OR] = Or;
module.exports[XPathParser.ExprType.PATH] = Path;
module.exports[XPathParser.ExprType.RELATIVE_LOCATION_PATH] = RelativeLocationPath;
module.exports[XPathParser.ExprType.SUBTRACTIVE] = Subtractive;
module.exports[XPathParser.ExprType.UNION] = Union;
