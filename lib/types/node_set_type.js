/* eslint-disable no-underscore-dangle */

"use strict";

var Adapter = require("../adapter");

var Iterator = require("../iterator");

function Entry (node) {
  this.node = node;
}

function NodeSetType (value) {
  this.first_ = null;
  this.last_ = null;
  this.length_ = 0;

  if (value) {
    value.forEach(function (node) {
      this.push(node);
    }, this);
  }
}

NodeSetType.prototype.iterator = function (reversed) {
  return new Iterator(this, reversed);
};

NodeSetType.prototype.first = function () {
  return this.first_.node;
};

NodeSetType.prototype.last = function () {
  return this.last_.node;
};

NodeSetType.prototype.length = function () {
  return this.length_;
};

NodeSetType.prototype.empty = function () {
  return this.length() === 0;
};

NodeSetType.prototype.asString = function () {
  if (this.empty()) {
    return "";
  } else {
    return this.first().asString();
  }
};

NodeSetType.prototype.asNumber = function () {
  return +this.asString();
};

NodeSetType.prototype.asBoolean = function () {
  return this.length() !== 0;
};

NodeSetType.prototype.merge = function (b) {
  return NodeSetType.merge(this, b);
};

NodeSetType.prototype.push = function (node) {
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

NodeSetType.prototype.unshift = function (node) {
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

NodeSetType.prototype.filter = function (condition) {
  var node, iter = this.iterator();

  while ((node = iter.next())) {
    if (!condition(node)) {
      iter.remove();
    }
  }

  return this;
};

NodeSetType.merge = function (a, b) {
  var comparator = Adapter.getAdapter().compareDocumentPosition;

  if (comparator) {
    return NodeSetType.mergeWithOrder(a, b, comparator);
  } else {
    return NodeSetType.mergeWithoutOrder(a, b);
  }
};

NodeSetType.mergeWithOrder = function (a, b, comparator) {
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

NodeSetType.mergeWithoutOrder = function (a, b) {
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

  return new NodeSetType(nodes);
};

NodeSetType.prototype.toString = function () {
  var node, iter = this.iterator();

  var nodes = [];

  while ((node = iter.next())) {
    nodes.push("" + node);
  }

  return "NodeSet<" + nodes.join(", ") + ">";
};

module.exports = NodeSetType;
