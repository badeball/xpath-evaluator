export default class XPathNumber {
  private value: number;

  constructor(value: number) {
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
