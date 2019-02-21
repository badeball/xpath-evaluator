import Context from "../context";

import { XPathValue } from "../types.d";

import XPathBoolean from "../types/xpath_boolean";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  if (args.length !== 2) {
    throw new Error("Expected two arguments");
  }

  var base = args[0].asString();

  var substring = args[1].asString();

  var index = base.indexOf(substring);

  return new XPathBoolean(index === 0);
}
