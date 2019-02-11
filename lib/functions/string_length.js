import XPathString from "../types/xpath_string";

import XPathNumber from "../types/xpath_number";

export default function evaluate (context, string) {
  if (!string) {
    string = context.getNode().asString();
  } else {
    if (arguments.length > 2) {
      throw new Error("Expected at most one argument");
    }

    if (!(string instanceof XPathString)) {
      throw new Error("Wrong type of argument");
    }

    string = string.asString();
  }

  return new XPathNumber(string.length);
}
