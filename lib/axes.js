/* eslint-env node */

module.exports = {};

var XPathParser = require("xpath-parser");

var Ancestor = require("./axes/ancestor");

var AncestorOrSelf = require("./axes/ancestor_or_self");

var Attribute = require("./axes/attribute");

var Child = require("./axes/child");

var Descendant = require("./axes/descendant");

var DescendantOrSelf = require("./axes/descendant_or_self");

var Following = require("./axes/following");

var FollowingSibling = require("./axes/following_sibling");

var Namespace = require("./axes/namespace");

var Parent = require("./axes/parent");

var Preceding = require("./axes/preceding");

var PrecedingSibling = require("./axes/preceding_sibling");

var Self = require("./axes/self");

module.exports[XPathParser.AxisSpecifier.ANCESTOR] = Ancestor;
module.exports[XPathParser.AxisSpecifier.ANCESTOR_OR_SELF] = AncestorOrSelf;
module.exports[XPathParser.AxisSpecifier.ATTRIBUTE] = Attribute;
module.exports[XPathParser.AxisSpecifier.CHILD] = Child;
module.exports[XPathParser.AxisSpecifier.DESCENDANT] = Descendant;
module.exports[XPathParser.AxisSpecifier.DESCENDANT_OR_SELF] = DescendantOrSelf;
module.exports[XPathParser.AxisSpecifier.FOLLOWING] = Following;
module.exports[XPathParser.AxisSpecifier.FOLLOWING_SIBLING] = FollowingSibling;
module.exports[XPathParser.AxisSpecifier.NAMESPACE] = Namespace;
module.exports[XPathParser.AxisSpecifier.PARENT] = Parent;
module.exports[XPathParser.AxisSpecifier.PRECEDING] = Preceding;
module.exports[XPathParser.AxisSpecifier.PRECEDING_SIBLING] = PrecedingSibling;
module.exports[XPathParser.AxisSpecifier.SELF] = Self;
