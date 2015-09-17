/* eslint-env node */

"use strict";

var NumberType = require("../types/number_type");

module.exports = {
  evaluate: function (ast) {
    return new NumberType(ast.number);
  }
};
