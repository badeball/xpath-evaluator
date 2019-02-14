import XPathNumber from "../types/xpath_number";

export default function evaluate (context, ...args) {
  if (args.length !== 1) {
    throw new Error("Expected a single argument");
  }

  return new XPathNumber(args[0].asNumber());
}
