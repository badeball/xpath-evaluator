import Context from "../context";

import { XPathValue } from "../types.d";

import XPathString from "../types/xpath_string";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  if (args.length !== 2 && args.length !== 3) {
    throw new Error("Expected two or three arguments");
  }

  var base = args[0].asString();

  var start = Math.round(args[1].asNumber());

  var length = args[2];

  if (isNaN(start) || start === Infinity || start === -Infinity) {
    return new XPathString("");
  }

  if (length) {
    var roundedLength = Math.round(length.asNumber());

    if (isNaN(roundedLength) || roundedLength === -Infinity) {
      return new XPathString("");
    }

    return new XPathString(base.substring(start - 1, start + roundedLength - 1));
  } else {
    return new XPathString(base.substring(start - 1));
  }
}
