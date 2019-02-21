import Context from "../context";

import { XPathValue } from "../types.d";

import XPathString from "../types/xpath_string";

export default function evaluate<T> (context: Context<T>, ...args: XPathValue<T>[]) {
  if (args.length !== 3) {
    throw new Error("Expected three arguments");
  }

  if (!(args[0] instanceof XPathString) ||
      !(args[1] instanceof XPathString) ||
      !(args[2] instanceof XPathString)) {
    throw new Error("Expected string arguments");
  }

  var base = args[0].asString(),
      mapFrom = args[1].asString(),
      mapTo = args[2].asString();

  for (var i = 0; i < mapFrom.length; i++) {
    if (i < mapTo.length) {
      base = base.replace(new RegExp(mapFrom[i], "g"), mapTo[i]);
    } else {
      base = base.replace(new RegExp(mapFrom[i], "g"), "");
    }
  }

  return new XPathString(base);
}
