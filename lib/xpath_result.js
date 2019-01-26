import XPathException from "./xpath_exception";

import { TYPE_ERR } from "./xpath_exception_code";

import {
  ANY_TYPE,
  NUMBER_TYPE,
  STRING_TYPE,
  BOOLEAN_TYPE,
  UNORDERED_NODE_ITERATOR_TYPE,
  ORDERED_NODE_ITERATOR_TYPE,
  UNORDERED_NODE_SNAPSHOT_TYPE,
  ORDERED_NODE_SNAPSHOT_TYPE,
  ANY_UNORDERED_NODE_TYPE,
  FIRST_ORDERED_NODE_TYPE
} from "./xpath_result_type";

import XPathNodeSet from "./types/xpath_node_set";

import XPathString from "./types/xpath_string";

import XPathNumber from "./types/xpath_number";

import XPathBoolean from "./types/xpath_boolean";

export default class XPathResult {
  constructor(type, value) {
    this.value = value;

    if (type === ANY_TYPE) {
      if (value instanceof XPathNodeSet) {
        this.resultType = UNORDERED_NODE_ITERATOR_TYPE;
      } else if (value instanceof XPathString) {
        this.resultType = STRING_TYPE;
      } else if (value instanceof XPathNumber) {
        this.resultType = NUMBER_TYPE;
      } else if (value instanceof XPathBoolean) {
        this.resultType = BOOLEAN_TYPE;
      } else {
        throw new Error("Unexpected evaluation result");
      }
    } else {
      this.resultType = type;
    }

    if (this.resultType !== STRING_TYPE &&
        this.resultType !== NUMBER_TYPE &&
        this.resultType !== BOOLEAN_TYPE &&
        !(value instanceof XPathNodeSet)) {
      throw Error("Value could not be converted to the specified type");
    }

    if (this.resultType === UNORDERED_NODE_ITERATOR_TYPE ||
        this.resultType === ORDERED_NODE_ITERATOR_TYPE ||
        this.resultType === UNORDERED_NODE_SNAPSHOT_TYPE ||
        this.resultType === ORDERED_NODE_SNAPSHOT_TYPE) {
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
        if (self.resultType !== NUMBER_TYPE) {
          throw new XPathException(TYPE_ERR, "resultType is not NUMBER_TYPE");
        }

        return self.value.asNumber();
      }});

      Object.defineProperty(this, "stringValue", {get: function () {
        if (self.resultType !== STRING_TYPE) {
          throw new XPathException(TYPE_ERR, "resultType is not STRING_TYPE");
        }

        return self.value.asString();
      }});

      Object.defineProperty(this, "booleanValue", {get: function () {
        if (self.resultType !== BOOLEAN_TYPE) {
          throw new XPathException(TYPE_ERR, "resultType is not BOOLEAN_TYPE");
        }

        return self.value.asBoolean();
      }});

      Object.defineProperty(this, "singleNodeValue", {get: function () {
        if (self.resultType !== FIRST_ORDERED_NODE_TYPE &&
            self.resultType !== ANY_UNORDERED_NODE_TYPE) {
          throw new XPathException(TYPE_ERR, "resultType is not a node set");
        }

        return self.value.empty() ? null : self.value.first().getNativeNode();
      }});

      Object.defineProperty(this, "invalidIteratorState", {get: function () {
        throw new Error("invalidIteratorState is not implemented");
      }});

      Object.defineProperty(this, "snapshotLength", {get: function () {
        if (self.resultType !== ORDERED_NODE_SNAPSHOT_TYPE &&
            self.resultType !== UNORDERED_NODE_SNAPSHOT_TYPE) {
          throw new XPathException(TYPE_ERR, "resultType is not a node set");
        }

        return self.value.length();
      }});
    } else {
      if (self.resultType === NUMBER_TYPE) {
        self.numberValue = self.value.asNumber();
      }

      if (self.resultType === STRING_TYPE) {
        self.stringValue = self.value.asString();
      }

      if (self.resultType === BOOLEAN_TYPE) {
        self.booleanValue = self.value.asBoolean();
      }

      if (self.resultType === FIRST_ORDERED_NODE_TYPE ||
          self.resultType === ANY_UNORDERED_NODE_TYPE) {
        self.singleNodeValue = self.value.empty() ? null : self.value.first().getNativeNode();
      }

      if (self.resultType === ORDERED_NODE_SNAPSHOT_TYPE ||
          self.resultType === UNORDERED_NODE_SNAPSHOT_TYPE) {
        self.snapshotLength = self.value.length();
      }
    }
  }

  iterateNext() {
    if (this.resultType !== ORDERED_NODE_ITERATOR_TYPE &&
        this.resultType !== UNORDERED_NODE_ITERATOR_TYPE) {
      throw new XPathException(TYPE_ERR, "iterateNext called with wrong result type");
    }

    this.index = this.index || 0;

    return (this.index >= this.nodes.length) ? null : this.nodes[this.index++];
  }

  snapshotItem(index) {
    if (this.resultType !== ORDERED_NODE_SNAPSHOT_TYPE &&
        this.resultType !== UNORDERED_NODE_SNAPSHOT_TYPE) {
      throw new XPathException(TYPE_ERR, "snapshotItem called with wrong result type");
    }

    return this.nodes[index] || null;
  }
}

XPathResult.ANY_TYPE = ANY_TYPE;
XPathResult.NUMBER_TYPE = NUMBER_TYPE;
XPathResult.STRING_TYPE = STRING_TYPE;
XPathResult.BOOLEAN_TYPE = BOOLEAN_TYPE;
XPathResult.UNORDERED_NODE_ITERATOR_TYPE = UNORDERED_NODE_ITERATOR_TYPE;
XPathResult.ORDERED_NODE_ITERATOR_TYPE = ORDERED_NODE_ITERATOR_TYPE;
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = UNORDERED_NODE_SNAPSHOT_TYPE;
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = ORDERED_NODE_SNAPSHOT_TYPE;
XPathResult.ANY_UNORDERED_NODE_TYPE = ANY_UNORDERED_NODE_TYPE;
XPathResult.FIRST_ORDERED_NODE_TYPE = FIRST_ORDERED_NODE_TYPE;
