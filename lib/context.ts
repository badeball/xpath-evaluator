import { IAdapter } from "./types.d";

export default class Context<T> {
  constructor(
    private readonly node: IAdapter<T>,
    private readonly position: number,
    private readonly last: number
  ) { }

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
