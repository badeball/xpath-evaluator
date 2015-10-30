"use strict";

function NumberType (value) {
  this.value = value;
}

NumberType.prototype.asString = function () {
  return "" + this.value;
};

NumberType.prototype.asNumber = function () {
  return this.value;
};

NumberType.prototype.asBoolean = function () {
  return !!this.value;
};

module.exports = NumberType;
