"use strict";

var StringType = require("../types/string_type");

module.exports = {
  evaluate: function (context, base, mapFrom, mapTo) {
    if (!mapTo) {
      throw new Error("Expected three arguments");
    }

    if (!(base instanceof StringType) ||
        !(mapFrom instanceof StringType) ||
        !(mapTo instanceof StringType)) {
      throw new Error("Expected string arguments");
    }

    base = base.asString();

    mapFrom = mapFrom.asString();

    mapTo = mapTo.asString();

    for (var i = 0; i < mapFrom.length; i++) {
      if (i < mapTo.length) {
        base = base.replace(new RegExp(mapFrom[i], "g"), mapTo[i]);
      } else {
        base = base.replace(new RegExp(mapFrom[i], "g"), "");
      }
    }

    return new StringType(base);
  }
};
