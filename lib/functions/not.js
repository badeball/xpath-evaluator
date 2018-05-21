import XPathBoolean from "../types/xpath_boolean";

export default function evaluate (context, value) {
  if (!value) {
    throw new Error("Missing argument");
  }

  if (arguments.length > 2) {
    throw new Error("Unknown argument(s)");
  }

  return new XPathBoolean(!value.asBoolean());
}
