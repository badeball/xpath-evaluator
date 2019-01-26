import Iterator from "../iterator";

class Entry {
  constructor(node) {
    this.node = node;
  }
}

export default class XPathNodeSet {
  constructor(value) {
    this.first_ = null;
    this.last_ = null;
    this.length_ = 0;

    if (value) {
      value.forEach(function (node) {
        this.push(node);
      }, this);
    }
  }

  iterator(reversed) {
    return new Iterator(this, reversed);
  }

  first() {
    return this.first_.node;
  }

  last() {
    return this.last_.node;
  }

  length() {
    return this.length_;
  }

  empty() {
    return this.length() === 0;
  }

  asString() {
    if (this.empty()) {
      return "";
    } else {
      return this.first().asString();
    }
  }

  asNumber() {
    return +this.asString();
  }

  asBoolean() {
    return this.length() !== 0;
  }

  merge(b) {
    return XPathNodeSet.merge(this, b);
  }

  push(node) {
    var entry = new Entry(node);

    entry.next = null;
    entry.previous = this.last_;

    if (this.first_) {
      this.last_.next = entry;
    } else {
      this.first_ = entry;
    }

    this.last_ = entry;
    this.length_++;

    return this;
  }

  unshift(node) {
    var entry = new Entry(node);

    entry.previous = null;
    entry.next = this.first_;

    if (this.first_) {
      this.first_.previous = entry;
    } else {
      this.last_ = entry;
    }

    this.first_ = entry;
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

  static merge(a, b) {
    if (!a.first_) {
      return b;
    } else if (!b.first_) {
      return a;
    }

    var aCurr = a.first_;
    var bCurr = b.first_;
    var merged = a, tail = null, next = null, length = 0;

    while (aCurr && bCurr) {
      if (aCurr.node.isEqual(bCurr.node)) {
        next = aCurr;
        aCurr = aCurr.next;
        bCurr = bCurr.next;
      } else {
        var compareResult = aCurr.node.compareDocumentPosition(bCurr.node);

        if (compareResult > 0) {
          next = bCurr;
          bCurr = bCurr.next;
        } else {
          next = aCurr;
          aCurr = aCurr.next;
        }
      }

      next.previous = tail;

      if (tail) {
        tail.next = next;
      } else {
        merged.first_ = next;
      }

      tail = next;
      length++;
    }

    next = aCurr || bCurr;

    while (next) {
      next.previous = tail;
      tail.next = next;
      tail = next;
      length++;
      next = next.next;
    }

    merged.last_ = tail;
    merged.length_ = length;

    return merged;
  }

  static mergeWithoutOrder(a, b) {
    var nodes = [], node, iter = a.iterator();

    while ((node = iter.next())) {
      nodes.push(node);
    }

    iter = b.iterator();

    while ((node = iter.next())) {
      var keep = nodes.every(function (addedNode) {
        return !addedNode.isEqual(node);
      });

      if (keep) {
        nodes.push(node);
      }
    }

    return new XPathNodeSet(nodes);
  }

  toString() {
    var node, iter = this.iterator();

    var nodes = [];

    while ((node = iter.next())) {
      nodes.push("" + node);
    }

    return "NodeSet<" + nodes.join(", ") + ">";
  }
}
