import XPathString from "../types/xpath_string";

import XPathNumber from "../types/xpath_number";

export default function evaluate (context, ...args) {
  var string = args[0];

  if (!string) {
    string = context.getNode().asString();
  } else {
    if (args.length > 1) {
      throw new Error("Expected at most one argument");
    }

    if (!(string instanceof XPathString)) {
      throw new Error("Wrong type of argument");
    }

    string = string.asString();
  }

  return new XPathNumber(string.length);
}
