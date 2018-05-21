export default function XPathNumber (value) {
  this.value = value;
}

XPathNumber.prototype.asString = function () {
  return "" + this.value;
};

XPathNumber.prototype.asNumber = function () {
  return this.value;
};

XPathNumber.prototype.asBoolean = function () {
  return !!this.value;
};
