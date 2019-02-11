import XPathString from "../types/xpath_string";

export default function evaluate (context, value) {
  var string;

  if (!value) {
    string = context.getNode().asString();
  } else {
    if (arguments.length > 2) {
      throw new Error("Expected at most one argument");
    }

    string = value.asString();
  }

  return new XPathString(string.trim().replace(/\s{2,}/g, " "));
}
