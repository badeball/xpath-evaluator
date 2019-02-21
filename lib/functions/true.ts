import Context from "../context";

import { XPathValue } from "../types.d";

import XPathBoolean from "../types/xpath_boolean";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  return new XPathBoolean(true);
}
