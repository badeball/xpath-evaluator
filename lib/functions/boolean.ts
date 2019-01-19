import Context from "../context";

import { XPathValue } from "../types.d";

import XPathBoolean from "../types/xpath_boolean";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  if (args.length !== 1) {
    throw new Error("Expected a single argument");
  }

  return new XPathBoolean(args[0].asBoolean());
}
