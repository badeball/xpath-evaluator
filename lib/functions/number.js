import XPathNumber from "../types/xpath_number";

export default function evaluate (context, value) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  return new XPathNumber(value.asNumber());
}
