"use strict";

function StringType (value) {
  this.value = value;
}

StringType.prototype.asString = function () {
  return this.value;
};

StringType.prototype.asNumber = function () {
  return +this.value;
};

StringType.prototype.asBoolean = function () {
  return this.value.length !== 0;
};

module.exports = StringType;
