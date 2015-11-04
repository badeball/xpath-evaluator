"use strict";

var XPathString = require("../types/xpath_string");

module.exports = {
  evaluate: function (rootEvaluator, ast) {
    return new XPathString(ast.string);
  }
};
