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

import Ancestor from "./axes/ancestor";

import AncestorOrSelf from "./axes/ancestor_or_self";

import Attribute from "./axes/attribute";

import Child from "./axes/child";

import Descendant from "./axes/descendant";

import DescendantOrSelf from "./axes/descendant_or_self";

import Following from "./axes/following";

import FollowingSibling from "./axes/following_sibling";

import Namespace from "./axes/namespace";

import Parent from "./axes/parent";

import Preceding from "./axes/preceding";

import PrecedingSibling from "./axes/preceding_sibling";

import Self from "./axes/self";

var Axes = {};

Axes[ANCESTOR] = Ancestor;
Axes[ANCESTOR_OR_SELF] = AncestorOrSelf;
Axes[ATTRIBUTE] = Attribute;
Axes[CHILD] = Child;
Axes[DESCENDANT] = Descendant;
Axes[DESCENDANT_OR_SELF] = DescendantOrSelf;
Axes[FOLLOWING] = Following;
Axes[FOLLOWING_SIBLING] = FollowingSibling;
Axes[NAMESPACE] = Namespace;
Axes[PARENT] = Parent;
Axes[PRECEDING] = Preceding;
Axes[PRECEDING_SIBLING] = PrecedingSibling;
Axes[SELF] = Self;

export default Axes;
