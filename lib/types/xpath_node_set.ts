import { IAdapter } from "../types.d";

import LinkedList from "../linked_list";

export default class XPathNodeSet<T> extends LinkedList<IAdapter<T>> {
  asString() {
    var first = this.first();

    if (first) {
      return first.asString();
    } else {
      return "";
    }
  }

  first() {
    return this.bounds_ && this.bounds_.head.node;
  }

  last() {
    return this.bounds_ && this.bounds_.tail.node;
  }

  asNumber() {
    return +this.asString();
  }

  asBoolean() {
    return this.length() !== 0;
  }

  merge(b: XPathNodeSet<T>) {
    var a = this;
    var merged = new XPathNodeSet<T>();

    var aCurr = a.bounds_ && a.bounds_.head;
    var bCurr = b.bounds_ && b.bounds_.head;

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
    var nodes: string[] = [];

    for (var node of this.iterator()) {
      nodes.push("" + node);
    }

    return "NodeSet<" + nodes.join(", ") + ">";
  }
}
