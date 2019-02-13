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

    var merged = new XPathNodeSet();
    var aCurr = a.head_;
    var bCurr = b.head_;

    while (aCurr && bCurr) {
      if (aCurr.node.isEqual(bCurr.node)) {
        merged.push(aCurr.node);
        aCurr = aCurr.next;
        bCurr = bCurr.next;
      } else {
        var compareResult = aCurr.node.compareDocumentPosition(bCurr.node);

        if (compareResult > 0) {
          merged.push(bCurr.node);
          bCurr = bCurr.next;
        } else {
          merged.push(aCurr.node);
          aCurr = aCurr.next;
        }
      }
    }

    var next = aCurr || bCurr;

    while (next) {
      merged.push(next.node);
      next = next.next;
    }

    return merged;
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
