/* eslint-env node */

"use strict";

function XPathString (value) {
  this.value = value;
}

XPathString.prototype.asString = function () {
  return this.value;
};

XPathString.prototype.asNumber = function () {
  return +this.value;
};

XPathString.prototype.asBoolean = function () {
  return this.value.length !== 0;
};

module.exports = XPathString;
