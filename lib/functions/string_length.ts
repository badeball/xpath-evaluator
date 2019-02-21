import Context from "../context";

import { XPathValue } from "../types.d";

import XPathString from "../types/xpath_string";

import XPathNumber from "../types/xpath_number";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  var string = args[0];

  if (!string) {
    return new XPathNumber(context.getNode().asString().length);
  } else {
    if (args.length > 1) {
      throw new Error("Expected at most one argument");
    }

    if (!(string instanceof XPathString)) {
      throw new Error("Wrong type of argument");
    }

    return new XPathNumber(string.asString().length);
  }
}
