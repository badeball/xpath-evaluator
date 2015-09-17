/* eslint-env node */

"use strict";

var StringType = require("../types/string_type");

module.exports = {
  evaluate: function (ast) {
    return new StringType(ast.string);
  }
};
