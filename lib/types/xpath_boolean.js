"use strict";

function XPathBoolean (value) {
  this.value = value;
}

XPathBoolean.prototype.asString = function () {
  return "" + this.value;
};

XPathBoolean.prototype.asNumber = function () {
  return this.value ? 1 : 0;
};

XPathBoolean.prototype.asBoolean = function () {
  return this.value;
};

module.exports = XPathBoolean;
