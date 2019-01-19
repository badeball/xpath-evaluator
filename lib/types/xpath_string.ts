export default class XPathString {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  asString() {
    return this.value;
  }

  asNumber() {
    return +this.value;
  }

  asBoolean() {
    return this.value.length !== 0;
  }
}
