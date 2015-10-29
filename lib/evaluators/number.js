/* eslint-env node */

"use strict";

var NumberType = require("../types/number_type");

module.exports = {
  evaluate: function (rootEvaluator, ast) {
    return new NumberType(ast.number);
  }
};
