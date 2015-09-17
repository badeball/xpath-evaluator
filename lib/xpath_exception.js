/* eslint-env node */

"use strict";

function XPathException (code, message) {
  this.code = code;
  this.message = message;
}

module.exports = XPathException;
