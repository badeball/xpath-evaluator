"use strict";

var NumberType = require("../types/number_type");

module.exports = {
  evaluate: function (context) {
    return new NumberType(context.getLast());
  }
};
