import Context from "../context";

import { XPathValue } from "../types.d";

import XPathString from "../types/xpath_string";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  if (args.length === 0) {
    throw new Error("Expected some arguments");
  }

  return new XPathString(args.map(function (arg) {
    return arg.asString();
  }).join(""));
}
