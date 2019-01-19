import Context from "../context";

import { XPathValue } from "../types.d";

import XPathNumber from "../types/xpath_number";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  return new XPathNumber(context.getPosition());
}
