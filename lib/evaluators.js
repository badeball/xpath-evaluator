/* eslint-env node */

var XPathAnalyzer = require("xpath-analyzer");

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

module.exports = {};

module.exports[XPathAnalyzer.ExprType.ABSOLUTE_LOCATION_PATH] = AbsoluteLocationPath;
module.exports[XPathAnalyzer.ExprType.ADDITIVE] = Additive;
module.exports[XPathAnalyzer.ExprType.AND] = And;
module.exports[XPathAnalyzer.ExprType.DIVISIONAL] = Divisional;
module.exports[XPathAnalyzer.ExprType.EQUALITY] = Equality;
module.exports[XPathAnalyzer.ExprType.FILTER] = Filter;
module.exports[XPathAnalyzer.ExprType.FUNCTION_CALL] = FunctionCall;
module.exports[XPathAnalyzer.ExprType.GREATER_THAN] = GreaterThan;
module.exports[XPathAnalyzer.ExprType.GREATER_THAN_OR_EQUAL] = GreaterThanOrEqual;
module.exports[XPathAnalyzer.ExprType.INEQUALITY] = Inequality;
module.exports[XPathAnalyzer.ExprType.LESS_THAN] = LessThan;
module.exports[XPathAnalyzer.ExprType.LESS_THAN_OR_EQUAL] = LessThanOrEqual;
module.exports[XPathAnalyzer.ExprType.LITERAL] = Literal;
module.exports[XPathAnalyzer.ExprType.MODULUS] = Modulus;
module.exports[XPathAnalyzer.ExprType.MULTIPLICATIVE] = Multiplicative;
module.exports[XPathAnalyzer.ExprType.NEGATION] = Negation;
module.exports[XPathAnalyzer.ExprType.NUMBER] = Number_;
module.exports[XPathAnalyzer.ExprType.OR] = Or;
module.exports[XPathAnalyzer.ExprType.PATH] = Path;
module.exports[XPathAnalyzer.ExprType.RELATIVE_LOCATION_PATH] = RelativeLocationPath;
module.exports[XPathAnalyzer.ExprType.SUBTRACTIVE] = Subtractive;
module.exports[XPathAnalyzer.ExprType.UNION] = Union;
