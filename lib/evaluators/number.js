/* eslint-env node */

"use strict";

var XPathNumber = require("../types/xpath_number");

module.exports = {
  evaluate: function (rootEvaluator, ast) {
    return new XPathNumber(ast.number);
  }
};
