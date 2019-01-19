import XPathBoolean from "../types/xpath_boolean";

import XPathNodeSet from "../types/xpath_node_set";

import XPathNumber from "../types/xpath_number";

import XPathString from "../types/xpath_string";

export type XPathValue<T> = XPathBoolean | XPathNodeSet<T> | XPathNumber | XPathString;
