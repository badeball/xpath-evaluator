import XPathString from "../types/xpath_string";

export default function evaluate (context, ...args) {
  if (args.length === 0) {
    throw new Error("Expected some arguments");
  }

  args = args.map(function (arg) {
    return arg.asString();
  });

  return new XPathString(args.join(""));
}
