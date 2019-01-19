export default class XPathBoolean {
  private value: boolean;

  constructor(value: boolean) {
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
