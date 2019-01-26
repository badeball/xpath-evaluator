export default class XPathBoolean {
  constructor(value) {
    this.value = value;
  }

  asString() {
    return "" + this.value;
  }

  asNumber() {
    return this.value ? 1 : 0;
  }

  asBoolean() {
    return this.value;
  }
}
