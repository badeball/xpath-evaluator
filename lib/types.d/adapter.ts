export interface IAdapter<T> {
  getNativeNode(): T

  asString(): string

  asNumber(): number

  getNodeType(): number

  getChildNodes(): IAdapter<T>[]

  getFollowingSiblings(): IAdapter<T>[]

  getPrecedingSiblings(): IAdapter<T>[]

  getAttributes(): IAdapter<T>[]

  getParent(): IAdapter<T>

  getOwnerDocument(): IAdapter<T>

  getElementById(id: string): IAdapter<T> | null

  getName(): string

  isEqual(node: IAdapter<T>): boolean

  compareDocumentPosition(node: IAdapter<T>): -1 | 0 | 1

  toString(): string
}

export type AdapterType<T> = new (nativeContext: T) => IAdapter<T>;
