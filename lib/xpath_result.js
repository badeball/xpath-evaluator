"use strict";

var XPathException = require("./xpath_exception");

var XPathExceptionCode = require("./xpath_exception_code");

var XPathResultType = require("./xpath_result_type");

var XPathNodeSet = require("./types/xpath_node_set");

var XPathString = require("./types/xpath_string");

var XPathNumber = require("./types/xpath_number");

var XPathBoolean = require("./types/xpath_boolean");

function XPathResult (type, value) {
  this.value = value;

  if (type === XPathResultType.ANY_TYPE) {
    if (value instanceof XPathNodeSet) {
      this.resultType = XPathResultType.UNORDERED_NODE_ITERATOR_TYPE;
    } else if (value instanceof XPathString) {
      this.resultType = XPathResultType.STRING_TYPE;
    } else if (value instanceof XPathNumber) {
      this.resultType = XPathResultType.NUMBER_TYPE;
    } else if (value instanceof XPathBoolean) {
      this.resultType = XPathResultType.BOOLEAN_TYPE;
    } else {
      throw new Error("Unexpected evaluation result");
    }
  } else {
    this.resultType = type;
  }

  if (this.resultType !== XPathResultType.STRING_TYPE &&
      this.resultType !== XPathResultType.NUMBER_TYPE &&
      this.resultType !== XPathResultType.BOOLEAN_TYPE &&
      !(value instanceof XPathNodeSet)) {
    throw Error("Value could not be converted to the specified type");
  }

  if (this.resultType === XPathResultType.UNORDERED_NODE_ITERATOR_TYPE ||
      this.resultType === XPathResultType.ORDERED_NODE_ITERATOR_TYPE ||
      this.resultType === XPathResultType.UNORDERED_NODE_SNAPSHOT_TYPE ||
      this.resultType === XPathResultType.ORDERED_NODE_SNAPSHOT_TYPE) {
    this.nodes = [];

    var node, iter = this.value.iterator();

    while ((node = iter.next())) {
      this.nodes.push(node.getNativeNode());
    }
  }

  var self = this;

  var hasDefineProperty = true;

  try {
    Object.defineProperty({}, "x", {});
  } catch (e) {
    hasDefineProperty = false;
  }

  if (hasDefineProperty) {
    Object.defineProperty(this, "numberValue", {get: function () {
      if (self.resultType !== XPathResultType.NUMBER_TYPE) {
        throw new XPathException(XPathExceptionCode.TYPE_ERR, "resultType is not NUMBER_TYPE");
      }

      return self.value.asNumber();
    }});

    Object.defineProperty(this, "stringValue", {get: function () {
      if (self.resultType !== XPathResultType.STRING_TYPE) {
        throw new XPathException(XPathExceptionCode.TYPE_ERR, "resultType is not STRING_TYPE");
      }

      return self.value.asString();
    }});

    Object.defineProperty(this, "booleanValue", {get: function () {
      if (self.resultType !== XPathResultType.BOOLEAN_TYPE) {
        throw new XPathException(XPathExceptionCode.TYPE_ERR, "resultType is not BOOLEAN_TYPE");
      }

      return self.value.asBoolean();
    }});

    Object.defineProperty(this, "singleNodeValue", {get: function () {
      if (self.resultType !== XPathResultType.FIRST_ORDERED_NODE_TYPE &&
          self.resultType !== XPathResultType.ANY_UNORDERED_NODE_TYPE) {
        throw new XPathException(XPathExceptionCode.TYPE_ERR, "resultType is not a node set");
      }

      return self.value.empty() ? null : self.value.first().getNativeNode();
    }});

    Object.defineProperty(this, "invalidIteratorState", {get: function () {
      throw new Error("invalidIteratorState is not implemented");
    }});

    Object.defineProperty(this, "snapshotLength", {get: function () {
      if (self.resultType !== XPathResultType.ORDERED_NODE_SNAPSHOT_TYPE &&
          self.resultType !== XPathResultType.UNORDERED_NODE_SNAPSHOT_TYPE) {
        throw new XPathException(XPathExceptionCode.TYPE_ERR, "resultType is not a node set");
      }

      return self.value.length();
    }});
  } else {
    if (self.resultType === XPathResultType.NUMBER_TYPE) {
      self.numberValue = self.value.asNumber();
    }

    if (self.resultType === XPathResultType.STRING_TYPE) {
      self.stringValue = self.value.asString();
    }

    if (self.resultType === XPathResultType.BOOLEAN_TYPE) {
      self.booleanValue = self.value.asBoolean();
    }

    if (self.resultType === XPathResultType.FIRST_ORDERED_NODE_TYPE ||
        self.resultType === XPathResultType.ANY_UNORDERED_NODE_TYPE) {
      self.singleNodeValue = self.value.empty() ? null : self.value.first().getNativeNode();
    }

    if (self.resultType === XPathResultType.ORDERED_NODE_SNAPSHOT_TYPE ||
        self.resultType === XPathResultType.UNORDERED_NODE_SNAPSHOT_TYPE) {
      self.snapshotLength = self.value.length();
    }
  }
}

XPathResult.prototype.iterateNext = function () {
  if (this.resultType !== XPathResultType.ORDERED_NODE_ITERATOR_TYPE &&
      this.resultType !== XPathResultType.UNORDERED_NODE_ITERATOR_TYPE) {
    throw new XPathException(XPathExceptionCode.TYPE_ERR, "iterateNext called with wrong result type");
  }

  this.index = this.index || 0;

  return (this.index.length >= this.nodes.length) ? null : this.nodes[this.index];
};

XPathResult.prototype.snapshotItem = function (index) {
  if (this.resultType !== XPathResultType.ORDERED_NODE_SNAPSHOT_TYPE &&
      this.resultType !== XPathResultType.UNORDERED_NODE_SNAPSHOT_TYPE) {
    throw new XPathException(XPathExceptionCode.TYPE_ERR, "snapshotItem called with wrong result type");
  }

  return this.nodes[index] || null;
};

for (var resultType in XPathResultType) {
  if (XPathResultType.hasOwnProperty(resultType)) {
    XPathResult[resultType] = XPathResultType[resultType];
  }
}

module.exports = XPathResult;
