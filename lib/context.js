export default class Context {
  constructor(node, position, last) {
    this.node = node;
    this.position = position;
    this.last = last;
  }

  getNode() {
    return this.node;
  }

  getPosition() {
    return this.position;
  }

  getLast() {
    return this.last;
  }

  toString() {
    return "Context<" + this.node + ">";
  }
}
