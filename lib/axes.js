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
} from "xpath-analyzer/lib/axis_specifier";

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

export default {
  [ANCESTOR]: Ancestor,
  [ANCESTOR_OR_SELF]: AncestorOrSelf,
  [ATTRIBUTE]: Attribute,
  [CHILD]: Child,
  [DESCENDANT]: Descendant,
  [DESCENDANT_OR_SELF]: DescendantOrSelf,
  [FOLLOWING]: Following,
  [FOLLOWING_SIBLING]: FollowingSibling,
  [NAMESPACE]: Namespace,
  [PARENT]: Parent,
  [PRECEDING]: Preceding,
  [PRECEDING_SIBLING]: PrecedingSibling,
  [SELF]: Self
};
