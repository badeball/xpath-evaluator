export default class XPathNumber {
  constructor(value) {
    this.value = value;
  }

  asString() {
    return "" + this.value;
  }

  asNumber() {
    return this.value;
  }

  asBoolean() {
    return !!this.value;
  }
}
