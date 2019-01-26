import Iterator from "./iterator";

class NodeWrapper {
  constructor(node) {
    this.node = node;
  }
}

export default class LinkedList {
  constructor(nodes) {
    this.head_ = null;
    this.tail_ = null;
    this.length_ = 0;

    if (nodes) {
      nodes.forEach(function (node) {
        this.push(node);
      }, this);
    }
  }

  iterator(reversed) {
    return new Iterator(this, reversed);
  }

  head() {
    return this.head_;
  }

  tail() {
    return this.tail_;
  }

  length() {
    return this.length_;
  }

  empty() {
    return this.length_ === 0;
  }

  push(node) {
    var entry = new NodeWrapper(node);

    entry.next = null;
    entry.previous = this.tail_;

    if (this.head_) {
      this.tail_.next = entry;
    } else {
      this.head_ = entry;
    }

    this.tail_ = entry;
    this.length_++;

    return this;
  }

  unshift(node) {
    var entry = new NodeWrapper(node);

    entry.previous = null;
    entry.next = this.head_;

    if (this.head_) {
      this.head_.previous = entry;
    } else {
      this.tail_ = entry;
    }

    this.head_ = entry;
    this.length_++;

    return this;
  }

  filter(condition) {
    var node, iter = this.iterator();

    while ((node = iter.next())) {
      if (!condition(node)) {
        iter.remove();
      }
    }

    return this;
  }
}
