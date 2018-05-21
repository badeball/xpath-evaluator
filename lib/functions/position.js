import XPathNumber from "../types/xpath_number";

export default function evaluate (context) {
  return new XPathNumber(context.getPosition());
}
