import XPathNumber from "../types/xpath_number";

export default function evaluate (context, number) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  if (!(number instanceof XPathNumber)) {
    throw new Error("Wrong type of argument");
  }

  return new XPathNumber(Math.floor(number.asNumber()));
}
