export class NodeWrapper<T> {
  public node: T;
  public next: NodeWrapper<T> | null;
  public previous: NodeWrapper<T> | null;

  constructor(node: T) {
    this.node = node;
  }
}

class ListBounds<T> {
  constructor(
    public head: NodeWrapper<T>,
    public tail: NodeWrapper<T>
  ) { }
}

class EmptyIterator<T> implements IterableIterator<T> {
  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    return {
      done: true,
      value: null
    } as any as IteratorResult<T>;
  }

  remove() { }
}

class Iterator<T> implements IterableIterator<T> {
  private list: LinkedList<T>;
  private reversed: boolean;
  private current: NodeWrapper<T> | null;
  private lastReturned: NodeWrapper<T> | null;
  private i: number;

  constructor(list: LinkedList<T>, reversed: boolean = false) {
    this.list = list;
    this.reversed = reversed;
    this.current = reversed ? list.tail() : list.head();
    this.lastReturned = null;
    this.i = 0;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    this.i++;

    if (this.i > 10000) {
      throw new Error("An error has probably ocurred!");
    }

    if (this.current) {
      this.lastReturned = this.current;

      if (this.reversed) {
        this.current = this.current.previous;
      } else {
        this.current = this.current.next;
      }

      return {
        done: false,
        value: this.lastReturned.node
      };
    } else {
      /**
       * Somehwere along the road, iterators and strictNullChecks stopped working well together.
       *
       * @see https://github.com/Microsoft/TypeScript/issues/11375
       */
      return {
        done: true,
        value: null
      } as any as IteratorResult<T>;
    }
  }

  remove() {
    if (!this.lastReturned) {
      throw new Error("Iterator.remove() was called before iterating");
    }

    if (!this.list.bounds_) {
      throw new Error("Iterator.remove() was somehow invoked on an empty list");
    }

    var next = this.lastReturned.next,
        previous = this.lastReturned.previous;

    if (next && previous) {
      next.previous = previous;
      previous.next = next;
    } else if (next) {
      next.previous = previous;
      this.list.bounds_.head = next;
    } else if (previous) {
      previous.next = next;
      this.list.bounds_.tail = previous;
    } else {
      this.list.bounds_ = null;
    }

    this.lastReturned = null;
    this.list.length_--;
  }
}



export default class LinkedList<T> {
  public bounds_: ListBounds<T> | null;
  public length_: number;

  constructor(nodes?: T[]) {
    this.length_ = 0;

    if (nodes) {
      nodes.forEach(function (node) {
        this.push(node);
      }, this);
    }
  }

  iterator(reversed?: boolean) {
    if (this.bounds_) {
      return new Iterator<T>(this, reversed);
    } else {
      return new EmptyIterator<T>();
    }
  }

  head() {
    return this.bounds_ && this.bounds_.head;
  }

  tail() {
    return this.bounds_ && this.bounds_.tail;
  }

  length() {
    return this.length_;
  }

  empty() {
    return this.length_ === 0;
  }

  push(node: T) {
    var entry = new NodeWrapper(node);

    if (this.bounds_) {
      entry.previous = this.bounds_.tail;
      this.bounds_.tail.next = entry;
      this.bounds_.tail = entry;
    } else {
      this.bounds_ = new ListBounds(entry, entry);
    }

    this.length_++;

    return this;
  }

  unshift(node: T) {
    var entry = new NodeWrapper(node);

    if (this.bounds_) {
      entry.next = this.bounds_.head;
      this.bounds_.head.previous = entry;
      this.bounds_.head = entry;
    } else {
      this.bounds_ = new ListBounds(entry, entry);
    }

    this.length_++;

    return this;
  }

  filter(condition: (node: T) => boolean) {
    var iter = this.iterator();

    for (var node of iter) {
      if (!condition(node)) {
        iter.remove();
      }
    }

    return this;
  }
}
