/* eslint-disable no-underscore-dangle */

"use strict";

var Adapter = require("../adapter");

var Iterator = require("../iterator");

function Entry (node) {
  this.node = node;
}

function XPathNodeSet (value) {
  this.first_ = null;
  this.last_ = null;
  this.length_ = 0;

  if (value) {
    value.forEach(function (node) {
      this.push(node);
    }, this);
  }
}

XPathNodeSet.prototype.iterator = function (reversed) {
  return new Iterator(this, reversed);
};

XPathNodeSet.prototype.first = function () {
  return this.first_.node;
};

XPathNodeSet.prototype.last = function () {
  return this.last_.node;
};

XPathNodeSet.prototype.length = function () {
  return this.length_;
};

XPathNodeSet.prototype.empty = function () {
  return this.length() === 0;
};

XPathNodeSet.prototype.asString = function () {
  if (this.empty()) {
    return "";
  } else {
    return this.first().asString();
  }
};

XPathNodeSet.prototype.asNumber = function () {
  return +this.asString();
};

XPathNodeSet.prototype.asBoolean = function () {
  return this.length() !== 0;
};

XPathNodeSet.prototype.merge = function (b) {
  return XPathNodeSet.merge(this, b);
};

XPathNodeSet.prototype.push = function (node) {
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
};

XPathNodeSet.prototype.unshift = function (node) {
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
};

XPathNodeSet.prototype.filter = function (condition) {
  var node, iter = this.iterator();

  while ((node = iter.next())) {
    if (!condition(node)) {
      iter.remove();
    }
  }

  return this;
};

XPathNodeSet.merge = function (a, b) {
  var comparator = Adapter.getAdapter().compareDocumentPosition;

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
      var compareResult = comparator(aCurr.node, bCurr.node);

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
};

XPathNodeSet.mergeWithoutOrder = function (a, b) {
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
};

XPathNodeSet.prototype.toString = function () {
  var node, iter = this.iterator();

  var nodes = [];

  while ((node = iter.next())) {
    nodes.push("" + node);
  }

  return "NodeSet<" + nodes.join(", ") + ">";
};

module.exports = XPathNodeSet;
