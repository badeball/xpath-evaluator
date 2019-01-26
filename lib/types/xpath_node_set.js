import LinekdList from "../linked_list";

export default class XPathNodeSet extends LinekdList {
  asString() {
    if (this.empty()) {
      return "";
    } else {
      return this.first().asString();
    }
  }

  first() {
    return super.head().node;
  }

  last() {
    return super.tail().node;
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

  static merge(a, b) {
    if (!a.head_) {
      return b;
    } else if (!b.head_) {
      return a;
    }

    var aCurr = a.head_;
    var bCurr = b.head_;
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
        merged.head_ = next;
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

    merged.tail_ = tail;
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
