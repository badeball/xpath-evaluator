import XPathBoolean from "../types/xpath_boolean";

export default function evaluate (context, ...args) {
  if (args.length !== 1) {
    throw new Error("Expected a single argument");
  }

  return new XPathBoolean(!args[0].asBoolean());
}
