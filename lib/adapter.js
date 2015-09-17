/* eslint-env node */

"use strict";

module.exports = {
  setAdapter: function (adapter) {
    this.adapter = adapter;
  },

  getAdapter: function () {
    if (!this.adapter) {
      throw new Error("No adapter is specified");
    }

    return this.adapter;
  }
};
