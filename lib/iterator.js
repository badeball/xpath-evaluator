/* eslint-disable no-underscore-dangle */

export default function Iterator (list, reversed) {
  this.list = list;
  this.reversed = reversed;
  this.current = reversed ? list.last_ : list.first_;
  this.lastReturned = null;
  this.i = 0;
}

Iterator.prototype.next = function () {
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

    return this.lastReturned.node;
  }
};

Iterator.prototype.remove = function () {
  if (!this.lastReturned) {
    throw new Error("remove was called before iterating!");
  }

  var next = this.lastReturned.next,
      previous = this.lastReturned.previous;

  if (next) {
    next.previous = previous;
  } else {
    this.list.last_ = previous;
  }

  if (previous) {
    previous.next = next;
  } else {
    this.list.first_ = next;
  }

  this.lastReturned = null;
  this.list.length_--;
};
