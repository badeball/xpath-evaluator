import XPathString from "../types/xpath_string";

export default function evaluate (context, ...args) {
  if (args.length !== 2) {
    throw new Error("Expected two arguments");
  }

  var base = args[0].asString();

  var substring = args[1].asString();

  var index = base.indexOf(substring);

  if (index === -1) {
    return new XPathString("");
  } else {
    return new XPathString(base.substring(0, index));
  }
}
