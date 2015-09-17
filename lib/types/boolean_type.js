/* eslint-env node */

"use strict";

function BooleanType (value) {
  this.value = value;
}

BooleanType.prototype.asString = function () {
  return "" + this.value;
};

BooleanType.prototype.asNumber = function () {
  return this.value ? 1 : 0;
};

BooleanType.prototype.asBoolean = function () {
  return this.value;
};

module.exports = BooleanType;
