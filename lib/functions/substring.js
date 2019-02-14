import XPathString from "../types/xpath_string";

export default function evaluate (context, ...args) {
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
    length = Math.round(length.asNumber());

    if (isNaN(length) || length === -Infinity) {
      return new XPathString("");
    }
  }

  if (length) {
    return new XPathString(base.substring(start - 1, start + length - 1));
  } else {
    return new XPathString(base.substring(start - 1));
  }
}
