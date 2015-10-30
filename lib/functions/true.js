"use strict";

var BooleanType = require("../types/boolean_type");

module.exports = {
  evaluate: function () {
    return new BooleanType(true);
  }
};
