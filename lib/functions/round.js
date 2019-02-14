import XPathNumber from "../types/xpath_number";

export default function evaluate (context, ...args) {
  if (args.length !== 1) {
    throw new Error("Expected a single argument");
  }

  var number = args[0];

  if (!(number instanceof XPathNumber)) {
    throw new Error("Wrong type of argument");
  }

  return new XPathNumber(Math.round(number.asNumber()));
}
