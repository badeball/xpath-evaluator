import XPathBoolean from "../types/xpath_boolean";

export default function evaluate (context, value) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  return new XPathBoolean(!value.asBoolean());
}
