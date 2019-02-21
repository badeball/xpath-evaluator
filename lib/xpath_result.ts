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

import {
  XPathResultType,
  XPathValue
} from "./types.d";

import XPathNodeSet from "./types/xpath_node_set";

import XPathString from "./types/xpath_string";

import XPathNumber from "./types/xpath_number";

import XPathBoolean from "./types/xpath_boolean";

export default class XPathResult<T> {
  private value: XPathValue<T>;
  private nodes: T[];
  private index: number;

  public readonly resultType: XPathResultType;
  public readonly numberValue: number;
  public readonly stringValue: string;
  public readonly booleanValue: boolean;
  public readonly singleNodeValue: T | null;
  public readonly snapshotLength: number;
  public readonly invalidIteratorState: boolean = false;

  public readonly ANY_TYPE = ANY_TYPE;
  public readonly NUMBER_TYPE = NUMBER_TYPE;
  public readonly STRING_TYPE = STRING_TYPE;
  public readonly BOOLEAN_TYPE = BOOLEAN_TYPE;
  public readonly UNORDERED_NODE_ITERATOR_TYPE = UNORDERED_NODE_ITERATOR_TYPE;
  public readonly ORDERED_NODE_ITERATOR_TYPE = ORDERED_NODE_ITERATOR_TYPE;
  public readonly UNORDERED_NODE_SNAPSHOT_TYPE = UNORDERED_NODE_SNAPSHOT_TYPE;
  public readonly ORDERED_NODE_SNAPSHOT_TYPE = ORDERED_NODE_SNAPSHOT_TYPE;
  public readonly ANY_UNORDERED_NODE_TYPE = ANY_UNORDERED_NODE_TYPE;
  public readonly FIRST_ORDERED_NODE_TYPE = FIRST_ORDERED_NODE_TYPE;

  public static readonly ANY_TYPE = ANY_TYPE;
  public static readonly NUMBER_TYPE = NUMBER_TYPE;
  public static readonly STRING_TYPE = STRING_TYPE;
  public static readonly BOOLEAN_TYPE = BOOLEAN_TYPE;
  public static readonly UNORDERED_NODE_ITERATOR_TYPE = UNORDERED_NODE_ITERATOR_TYPE;
  public static readonly ORDERED_NODE_ITERATOR_TYPE = ORDERED_NODE_ITERATOR_TYPE;
  public static readonly UNORDERED_NODE_SNAPSHOT_TYPE = UNORDERED_NODE_SNAPSHOT_TYPE;
  public static readonly ORDERED_NODE_SNAPSHOT_TYPE = ORDERED_NODE_SNAPSHOT_TYPE;
  public static readonly ANY_UNORDERED_NODE_TYPE = ANY_UNORDERED_NODE_TYPE;
  public static readonly FIRST_ORDERED_NODE_TYPE = FIRST_ORDERED_NODE_TYPE;

  constructor(type: XPathResultType, value: XPathValue<T>) {
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

      for (var node of (this.value as XPathNodeSet<T>).iterator()) {
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

        var first = (self.value as XPathNodeSet<T>).first();

        return first && first.getNativeNode();
      }});

      Object.defineProperty(this, "invalidIteratorState", {get: function () {
        throw new Error("invalidIteratorState is not implemented");
      }});

      Object.defineProperty(this, "snapshotLength", {get: function () {
        if (self.resultType !== ORDERED_NODE_SNAPSHOT_TYPE &&
            self.resultType !== UNORDERED_NODE_SNAPSHOT_TYPE) {
          throw new XPathException(TYPE_ERR, "resultType is not a node set");
        }

        return (self.value as XPathNodeSet<T>).length();
      }});
    } else {
      if (this.resultType === NUMBER_TYPE) {
        this.numberValue = this.value.asNumber();
      }

      if (this.resultType === STRING_TYPE) {
        this.stringValue = this.value.asString();
      }

      if (this.resultType === BOOLEAN_TYPE) {
        this.booleanValue = this.value.asBoolean();
      }

      if (this.resultType === FIRST_ORDERED_NODE_TYPE ||
        this.resultType === ANY_UNORDERED_NODE_TYPE) {
        var first = (this.value as XPathNodeSet<T>).first();
        this.singleNodeValue = first && first.getNativeNode();
      }

      if (this.resultType === ORDERED_NODE_SNAPSHOT_TYPE ||
          this.resultType === UNORDERED_NODE_SNAPSHOT_TYPE) {
        this.snapshotLength = (this.value as XPathNodeSet<T>).length();
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

  snapshotItem(index: number) {
    if (this.resultType !== ORDERED_NODE_SNAPSHOT_TYPE &&
        this.resultType !== UNORDERED_NODE_SNAPSHOT_TYPE) {
      throw new XPathException(TYPE_ERR, "snapshotItem called with wrong result type");
    }

    return this.nodes[index] || null;
  }
}
