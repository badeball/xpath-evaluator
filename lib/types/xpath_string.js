export default class XPathString {
  constructor(value) {
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
