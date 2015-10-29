/* eslint-env node */

var XPathAnalyzer = require("xpath-analyzer");

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

module.exports = {};

module.exports[XPathAnalyzer.AxisSpecifier.ANCESTOR] = Ancestor;
module.exports[XPathAnalyzer.AxisSpecifier.ANCESTOR_OR_SELF] = AncestorOrSelf;
module.exports[XPathAnalyzer.AxisSpecifier.ATTRIBUTE] = Attribute;
module.exports[XPathAnalyzer.AxisSpecifier.CHILD] = Child;
module.exports[XPathAnalyzer.AxisSpecifier.DESCENDANT] = Descendant;
module.exports[XPathAnalyzer.AxisSpecifier.DESCENDANT_OR_SELF] = DescendantOrSelf;
module.exports[XPathAnalyzer.AxisSpecifier.FOLLOWING] = Following;
module.exports[XPathAnalyzer.AxisSpecifier.FOLLOWING_SIBLING] = FollowingSibling;
module.exports[XPathAnalyzer.AxisSpecifier.NAMESPACE] = Namespace;
module.exports[XPathAnalyzer.AxisSpecifier.PARENT] = Parent;
module.exports[XPathAnalyzer.AxisSpecifier.PRECEDING] = Preceding;
module.exports[XPathAnalyzer.AxisSpecifier.PRECEDING_SIBLING] = PrecedingSibling;
module.exports[XPathAnalyzer.AxisSpecifier.SELF] = Self;
