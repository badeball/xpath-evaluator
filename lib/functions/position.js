"use strict";

var XPathNumber = require("../types/xpath_number");

module.exports = {
  evaluate: function (context) {
    return new XPathNumber(context.getPosition());
  }
};
