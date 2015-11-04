"use strict";

var XPathBoolean = require("../types/xpath_boolean");

module.exports = {
  evaluate: function () {
    return new XPathBoolean(true);
  }
};
