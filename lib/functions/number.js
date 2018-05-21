import XPathNumber from "../types/xpath_number";

export default function evaluate (context, value) {
  if (!value) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 2) {
    throw new Error("Unknown argument(s)");
  }

  return new XPathNumber(value.asNumber());
}
