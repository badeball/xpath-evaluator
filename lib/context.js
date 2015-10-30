"use strict";

function Context (node, position, last) {
  this.node = node;
  this.position = position;
  this.last = last;
}

Context.prototype.getNode = function () {
  return this.node;
};

Context.prototype.getPosition = function () {
  return this.position;
};

Context.prototype.getLast = function () {
  return this.last;
};

Context.prototype.toString = function () {
  return "Context<" + this.node + ">";
};

module.exports = Context;
