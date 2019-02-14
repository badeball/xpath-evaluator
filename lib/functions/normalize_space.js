import XPathString from "../types/xpath_string";

export default function evaluate (context, ...args) {
  var value = args[0];

  var string;

  if (!value) {
    string = context.getNode().asString();
  } else {
    if (args.length > 1) {
      throw new Error("Expected at most one argument");
    }

    string = value.asString();
  }

  return new XPathString(string.trim().replace(/\s{2,}/g, " "));
}
