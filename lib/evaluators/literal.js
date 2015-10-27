/* eslint-env node */

"use strict";

var StringType = require("../types/string_type");

module.exports = {
  evaluate: function (rootEvaluator, ast) {
    return new StringType(ast.string);
  }
};
