/* eslint-disable no-underscore-dangle */

"use strict";

var XPathNumber = require("../types/xpath_number");

function Number_ () {}

Number_.prototype.evaluate = function (rootEvaluator, ast) {
  return new XPathNumber(ast.number);
};

module.exports = Number_;
