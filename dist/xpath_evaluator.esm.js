import XPathAnalyzer, { RELATIVE_LOCATION_PATH, ANCESTOR_OR_SELF, NODE, FOLLOWING_SIBLING, DESCENDANT_OR_SELF, PRECEDING_SIBLING, ANCESTOR, ATTRIBUTE, CHILD, DESCENDANT, FOLLOWING, NAMESPACE, PARENT, PRECEDING, SELF, COMMENT, PROCESSING_INSTRUCTION, TEXT, EQUALITY, INEQUALITY, ABSOLUTE_LOCATION_PATH, ADDITIVE, AND, DIVISIONAL, FILTER, FUNCTION_CALL, GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL, LITERAL, MODULUS, MULTIPLICATIVE, NEGATION, NUMBER, OR, PATH, SUBTRACTIVE, UNION } from 'xpath-analyzer';

class Context {
  constructor(node, position, last) {
    this.node = node;
    this.position = position;
    this.last = last;
  }

  getNode() {
    return this.node;
  }

  getPosition() {
    return this.position;
  }

  getLast() {
    return this.last;
  }

  toString() {
    return "Context<" + this.node + ">";
  }
}

const TEXT_NODE = 3;
const PROCESSING_INSTRUCTION_NODE = 7;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;

class Iterator {
  constructor(list, reversed) {
    this.list = list;
    this.reversed = reversed;
    this.current = reversed ? list.tail_ : list.head_;
    this.lastReturned = null;
    this.i = 0;
  }

  next() {
    this.i++;

    if (this.i > 10000) {
      throw new Error("An error has probably ocurred!");
    }

    if (this.current) {
      this.lastReturned = this.current;

      if (this.reversed) {
        this.current = this.current.previous;
      } else {
        this.current = this.current.next;
      }

      return this.lastReturned.node;
    }
  }

  remove() {
    if (!this.lastReturned) {
      throw new Error("remove was called before iterating!");
    }

    var next = this.lastReturned.next,
        previous = this.lastReturned.previous;

    if (next) {
      next.previous = previous;
    } else {
      this.list.tail_ = previous;
    }

    if (previous) {
      previous.next = next;
    } else {
      this.list.head_ = next;
    }

    this.lastReturned = null;
    this.list.length_--;
  }
}

class NodeWrapper {
  constructor(node) {
    this.node = node;
  }
}

class LinkedList {
  constructor(nodes) {
    this.head_ = null;
    this.tail_ = null;
    this.length_ = 0;

    if (nodes) {
      nodes.forEach(function (node) {
        this.push(node);
      }, this);
    }
  }

  iterator(reversed) {
    return new Iterator(this, reversed);
  }

  head() {
    return this.head_;
  }

  tail() {
    return this.tail_;
  }

  length() {
    return this.length_;
  }

  empty() {
    return this.length_ === 0;
  }

  push(node) {
    var entry = new NodeWrapper(node);

    entry.next = null;
    entry.previous = this.tail_;

    if (this.head_) {
      this.tail_.next = entry;
    } else {
      this.head_ = entry;
    }

    this.tail_ = entry;
    this.length_++;

    return this;
  }

  unshift(node) {
    var entry = new NodeWrapper(node);

    entry.previous = null;
    entry.next = this.head_;

    if (this.head_) {
      this.head_.previous = entry;
    } else {
      this.tail_ = entry;
    }

    this.head_ = entry;
    this.length_++;

    return this;
  }

  filter(condition) {
    var node, iter = this.iterator();

    while ((node = iter.next())) {
      if (!condition(node)) {
        iter.remove();
      }
    }

    return this;
  }
}

class XPathNodeSet extends LinkedList {
  asString() {
    if (this.empty()) {
      return "";
    } else {
      return this.first().asString();
    }
  }

  first() {
    return super.head().node;
  }

  last() {
    return super.tail().node;
  }

  asNumber() {
    return +this.asString();
  }

  asBoolean() {
    return this.length() !== 0;
  }

  merge(b) {
    return XPathNodeSet.merge(this, b);
  }

  static merge(a, b) {
    if (!a.head_) {
      return b;
    } else if (!b.head_) {
      return a;
    }

    var aCurr = a.head_;
    var bCurr = b.head_;
    var merged = a, tail = null, next = null, length = 0;

    while (aCurr && bCurr) {
      if (aCurr.node.isEqual(bCurr.node)) {
        next = aCurr;
        aCurr = aCurr.next;
        bCurr = bCurr.next;
      } else {
        var compareResult = aCurr.node.compareDocumentPosition(bCurr.node);

        if (compareResult > 0) {
          next = bCurr;
          bCurr = bCurr.next;
        } else {
          next = aCurr;
          aCurr = aCurr.next;
        }
      }

      next.previous = tail;

      if (tail) {
        tail.next = next;
      } else {
        merged.head_ = next;
      }

      tail = next;
      length++;
    }

    next = aCurr || bCurr;

    while (next) {
      next.previous = tail;
      tail.next = next;
      tail = next;
      length++;
      next = next.next;
    }

    merged.tail_ = tail;
    merged.length_ = length;

    return merged;
  }

  toString() {
    var node, iter = this.iterator();

    var nodes = [];

    while ((node = iter.next())) {
      nodes.push("" + node);
    }

    return "NodeSet<" + nodes.join(", ") + ">";
  }
}

function evaluate(rootEvaluator, context, type) {
  var nodes = new XPathNodeSet();

  if (context.getNode().getNodeType() !== DOCUMENT_NODE) {
    nodes = nodes.unshift(context.getNode().getParent());

    nodes = nodes.merge(evaluate(rootEvaluator, new Context(context.getNode().getParent(), 1, 1), type));
  }

  return nodes;
}

function evaluate$1 (rootEvaluator, context, type) {
  var nodes = new XPathNodeSet([context.getNode()], true);

  return evaluate(rootEvaluator, context, type).merge(nodes);
}

function evaluate$2 (rootEvaluator, context, type) {
  return new XPathNodeSet(context.getNode().getAttributes());
}

function evaluate$3 (rootEvaluator, context, type) {
  return new XPathNodeSet(context.getNode().getChildNodes());
}

function evaluate$4 (rootEvaluator, context, type) {
  var nodes = new XPathNodeSet();

  var children = new XPathNodeSet(context.getNode().getChildNodes());

  var child, iter = children.iterator();

  while ((child = iter.next())) {
    nodes = nodes.push(child);

    nodes = nodes.merge(evaluate$4(rootEvaluator, new Context(child, 1, 1), type));
  }

  return nodes;
}

function evaluate$5 (rootEvaluator, context, type) {
  var nodes = new XPathNodeSet([context.getNode()]);

  return nodes.merge(evaluate$4(rootEvaluator, context, type));
}

function evaluate$6 (rootEvaluator, context, type) {
  return rootEvaluator.evaluate({
    type: RELATIVE_LOCATION_PATH,
    steps: [{
      axis: ANCESTOR_OR_SELF,
      test: {
        type: NODE
      }
    }, {
      axis: FOLLOWING_SIBLING,
      test: {
        type: NODE
      }
    }, {
      axis: DESCENDANT_OR_SELF,
      test: {
        type: NODE
      }
    }]
  }, context, type);
}

function evaluate$7 (rootEvaluator, context, type) {
  return new XPathNodeSet(context.getNode().getFollowingSiblings());
}

function Namespace () {
  throw new Error("Namespace axis is not implemented");
}

function evaluate$8 (rootEvaluator, context, type) {
  var nodes = new XPathNodeSet();

  if (context.getNode().getNodeType() !== DOCUMENT_NODE) {
    nodes = nodes.push(context.getNode().getParent());
  }

  return nodes;
}

function evaluate$9 (rootEvaluator, context, type) {
  return rootEvaluator.evaluate({
    type: RELATIVE_LOCATION_PATH,
    steps: [{
      axis: ANCESTOR_OR_SELF,
      test: {
        type: NODE
      }
    }, {
      axis: PRECEDING_SIBLING,
      test: {
        type: NODE
      }
    }, {
      axis: DESCENDANT_OR_SELF,
      test: {
        type: NODE
      }
    }]
  }, context, type);
}

function evaluate$a (rootEvaluator, context, type) {
  return new XPathNodeSet(context.getNode().getPrecedingSiblings());
}

function evaluate$b (rootEvaluator, context, type) {
  return new XPathNodeSet([context.getNode()]);
}

var Axes = {};

Axes[ANCESTOR] = evaluate;
Axes[ANCESTOR_OR_SELF] = evaluate$1;
Axes[ATTRIBUTE] = evaluate$2;
Axes[CHILD] = evaluate$3;
Axes[DESCENDANT] = evaluate$4;
Axes[DESCENDANT_OR_SELF] = evaluate$5;
Axes[FOLLOWING] = evaluate$6;
Axes[FOLLOWING_SIBLING] = evaluate$7;
Axes[NAMESPACE] = Namespace;
Axes[PARENT] = evaluate$8;
Axes[PRECEDING] = evaluate$9;
Axes[PRECEDING_SIBLING] = evaluate$a;
Axes[SELF] = evaluate$b;

class XPathNumber {
  constructor(value) {
    this.value = value;
  }

  asString() {
    return "" + this.value;
  }

  asNumber() {
    return this.value;
  }

  asBoolean() {
    return !!this.value;
  }
}

function evaluate$c (rootEvaluator, step, context, type) {
  var nodes;

  var axisEvaluator = Axes[step.axis];

  if (axisEvaluator) {
    nodes = axisEvaluator(rootEvaluator, context, type);
  } else {
    throw new Error("Unknown axis specifier " + step.axis);
  }

  if (step.test.name) {
    var name = step.test.name;

    nodes = nodes.filter(function (node) {
      return (name === "*" && node.getName()) || node.getName() === step.test.name;
    });
  }

  if (step.test.type && step.test.type !== NODE) {
    var nodeType;

    switch (step.test.type) {
      case COMMENT:
        nodeType = COMMENT_NODE;
        break;

      case PROCESSING_INSTRUCTION:
        nodeType = PROCESSING_INSTRUCTION_NODE;
        break;

      case TEXT:
        nodeType = TEXT_NODE;
        break;

      default:
        throw new Error("Unknown node nodeType " + step.test.nodeType);
    }

    nodes = nodes.filter(function (node) {
      return node.getNodeType() === nodeType;
    });
  }

  if (step.predicates) {
    var reversed = (
      step.axis === ANCESTOR ||
      step.axis === ANCESTOR_OR_SELF ||
      step.axis === PRECEDING ||
      step.axis === PRECEDING_SIBLING);

    var node, position = 0, length = nodes.length(), iter = nodes.iterator(reversed);

    while ((node = iter.next())) {
      position++;

      var keep = step.predicates.every(function (predicate) {
        var result = rootEvaluator.evaluate(predicate, new Context(node, position, length), type);

        if (result === null) {
          return false;
        }

        if (result instanceof XPathNumber) {
          // console.log(`Checking if ${result.asNumber()} === ${position}`, predicate);
          return result.asNumber() === position;
        } else {
          return result.asBoolean();
        }
      });

      if (!keep) {
        iter.remove();
      }
    }
  }

  return nodes;
}

function evaluate$d (rootEvaluator, ast, context, type) {
  var nodeSet = new XPathNodeSet([context.getNode()]),
      nextNodeSet = new XPathNodeSet();

  if (ast.steps) {
    for (var i = 0; i < ast.steps.length; i++) {
      var node, iter = nodeSet.iterator();

      while ((node = iter.next())) {
        var stepResult = evaluate$c(rootEvaluator, ast.steps[i], new Context(node, 1, 1), type);

        nextNodeSet = nextNodeSet.merge(stepResult);
      }

      nodeSet = nextNodeSet;
      nextNodeSet = new XPathNodeSet();
    }
  }

  return nodeSet;
}

function evaluate$e (rootEvaluator, ast, context, type) {
  if (context.getNode().getNodeType() !== DOCUMENT_NODE) {
    context = new Context(context.getNode().getOwnerDocument(), 1, 1);
  }

  return evaluate$d(rootEvaluator, ast, context, type);
}

function evaluate$f (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathNumber(lhs.asNumber() + rhs.asNumber());
}

class XPathBoolean {
  constructor(value) {
    this.value = value;
  }

  asString() {
    return "" + this.value;
  }

  asNumber() {
    return this.value ? 1 : 0;
  }

  asBoolean() {
    return this.value;
  }
}

function evaluate$g (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  if (!lhs.asBoolean()) {
    return new XPathBoolean(false);
  }

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathBoolean(rhs.asBoolean());
}

function evaluate$h (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathNumber(lhs.asNumber() / rhs.asNumber());
}

class XPathString {
  constructor(value) {
    this.value = value;
  }

  asString() {
    return this.value;
  }

  asNumber() {
    return +this.value;
  }

  asBoolean() {
    return this.value.length !== 0;
  }
}

function compareNodes (type, lhs, rhs, comparator) {
  if (lhs instanceof XPathNodeSet && rhs instanceof XPathNodeSet) {
    var lNode, lIter = lhs.iterator();

    while ((lNode = lIter.next())) {
      var rNode, rIter = rhs.iterator();

      while ((rNode = rIter.next())) {
        if (comparator(lNode.asString(), rNode.asString())) {
          return new XPathBoolean(true);
        }
      }
    }

    return new XPathBoolean(false);
  }

  if (lhs instanceof XPathNodeSet || rhs instanceof XPathNodeSet) {
    var nodeSet, primitive;

    if (lhs instanceof XPathNodeSet) {
      nodeSet = lhs;
      primitive = rhs;
    } else {
      nodeSet = rhs;
      primitive = lhs;
    }

    if (primitive instanceof XPathBoolean) {
      if (comparator(nodeSet.asBoolean(), primitive.asBoolean())) {
        return new XPathBoolean(true);
      }
    } else {
      var node, iter = nodeSet.iterator();

      while ((node = iter.next())) {
        if (primitive instanceof XPathNumber) {
          if (comparator(node.asNumber(), primitive.asNumber())) {
            return new XPathBoolean(true);
          }
        } else if (primitive instanceof XPathString) {
          if (comparator(node.asString(), primitive.asString())) {
            return new XPathBoolean(true);
          }
        } else {
          throw new Error("Unknown value type");
        }
      }
    }

    return new XPathBoolean(false);
  }

  // Neither object is a NodeSet at this point.


  if (type === EQUALITY ||
      type === INEQUALITY) {
    if (lhs instanceof XPathBoolean || rhs instanceof XPathBoolean) {
      if (comparator(lhs.asBoolean(), rhs.asBoolean())) {
        return new XPathBoolean(true);
      }
    } else if (lhs instanceof XPathNumber || rhs instanceof XPathNumber) {
      if (comparator(lhs.asNumber(), rhs.asNumber())) {
        return new XPathBoolean(true);
      }
    } else if (lhs instanceof XPathString || rhs instanceof XPathString) {
      if (comparator(lhs.asString(), rhs.asString())) {
        return new XPathBoolean(true);
      }
    } else {
      throw new Error("Unknown value types");
    }

    return new XPathBoolean(false);
  } else {
    return new XPathBoolean(comparator(lhs.asNumber(), rhs.asNumber()));
  }
}

function evaluate$i (rootEvaluator, ast, context, type) {
  return compareNodes(
    ast.type,
    rootEvaluator.evaluate(ast.lhs, context, type),
    rootEvaluator.evaluate(ast.rhs, context, type),
    function (lhs, rhs) {
      return lhs === rhs;
    }
  );
}

function evaluate$j (rootEvaluator, ast, context, type) {
  var nodes = rootEvaluator.evaluate(ast.primary, context, type);

  var node, position = 0, lenght = nodes.length(), iter = nodes.iterator();

  while ((node = iter.next())) {
    position++;

    var keep = ast.predicates.every(function (predicate) {
      var result = rootEvaluator.evaluate(predicate, new Context(node, position, length), type);

      if (result === null) {
        return false;
      }

      if (result instanceof XPathNumber) {
        return result.asNumber() === position;
      } else {
        return result.asBoolean();
      }
    });

    if (!keep) {
      iter.remove();
    }
  }

  return nodes;
}

function evaluate$k (context, value) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  return new XPathBoolean(value.asBoolean());
}

function evaluate$l (context, number) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  if (!(number instanceof XPathNumber)) {
    throw new Error("Wrong type of argument");
  }

  return new XPathNumber(Math.ceil(number.asNumber()));
}

function evaluate$m () {
  var args = [].slice.call(arguments);

  args.shift();

  if (args.length === 0) {
    throw new Error("Expected some arguments");
  }

  args = args.map(function (arg) {
    return arg.asString();
  });

  return new XPathString(args.join(""));
}

function evaluate$n (context, base, contains) {
  if (!contains) {
    throw new Error("Expected two arguments");
  }

  base = base.asString();

  contains = contains.asString();

  return new XPathBoolean(base.indexOf(contains) !== -1);
}

function evaluate$o (context, nodeset) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  if (!(nodeset instanceof XPathNodeSet)) {
    throw new Error("Wrong type of argument");
  }

  return new XPathNumber(nodeset.length());
}

function evaluate$p () {
  return new XPathBoolean(false);
}

function evaluate$q (context, number) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  if (!(number instanceof XPathNumber)) {
    throw new Error("Wrong type of argument");
  }

  return new XPathNumber(Math.floor(number.asNumber()));
}

function evaluate$r (context, value) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  var node, ids = [];

  if (value instanceof XPathNodeSet) {
    var iter = value.iterator();

    while ((node = iter.next())) {
      ids = ids.concat(node.asString().split(/\s+/g));
    }
  } else if (value instanceof XPathString) {
    ids = value.asString().split(/\s+/g);
  } else {
    ids.push(value.asString());
  }

  var nodes = new XPathNodeSet();

  for (var i = 0; i < ids.length; i++) {
    if (context.getNode().getNodeType() === DOCUMENT_NODE) {
      node = context.getNode().getElementById(ids[i]);
    } else {
      node = context.getNode().getOwnerDocument().getElementById(ids[i]);
    }

    if (node) {
      nodes = nodes.merge(new XPathNodeSet([node]));
    }
  }

  return nodes;
}

function evaluate$s (context) {
  return new XPathNumber(context.getLast());
}

function evaluate$t (context, nodeset) {
  if (!nodeset) {
    nodeset = new XPathNodeSet([context.getNode()]);
  }

  if (arguments.length > 2) {
    throw new Error("Expected at most one argument");
  }

  if (!(nodeset instanceof XPathNodeSet)) {
    throw new Error("Wrong type of argument");
  }

  if (nodeset.empty()) {
    return new XPathString("");
  } else {
    return new XPathString(nodeset.first().getName());
  }
}

function evaluate$u (context, nodeset) {
  if (!nodeset) {
    return new XPathString(context.getNode().getName());
  } else {
    if (arguments.length > 2) {
      throw new Error("Expected at most one argument");
    }

    if (!(nodeset instanceof XPathNodeSet)) {
      throw new Error("Wrong type of argument");
    }

    if (nodeset.empty()) {
      return new XPathString("");
    } else {
      return new XPathString(nodeset.first().getName());
    }
  }
}

function evaluate$v (context, value) {
  var string;

  if (!value) {
    string = context.getNode().asString();
  } else {
    if (arguments.length > 2) {
      throw new Error("Expected at most one argument");
    }

    string = value.asString();
  }

  return new XPathString(string.trim().replace(/\s{2,}/g, " "));
}

function evaluate$w (context, value) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  return new XPathBoolean(!value.asBoolean());
}

function evaluate$x (context, value) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  return new XPathNumber(value.asNumber());
}

function evaluate$y (context) {
  return new XPathNumber(context.getPosition());
}

function evaluate$z (context, number) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  if (!(number instanceof XPathNumber)) {
    throw new Error("Wrong type of argument");
  }

  return new XPathNumber(Math.round(number.asNumber()));
}

function evaluate$A (context, base, substring) {
  if (!substring) {
    throw new Error("Expected two arguments");
  }

  base = base.asString();

  substring = substring.asString();

  var index = base.indexOf(substring);

  return new XPathBoolean(index === 0);
}

function evaluate$B (context, string) {
  if (!string) {
    string = context.getNode().asString();
  } else {
    if (arguments.length > 2) {
      throw new Error("Expected at most one argument");
    }

    if (!(string instanceof XPathString)) {
      throw new Error("Wrong type of argument");
    }

    string = string.asString();
  }

  return new XPathNumber(string.length);
}

function evaluate$C (context, value) {
  if (!value) {
    value = new XPathNodeSet([context.getNode()]);
  }

  if (arguments.length > 2) {
    throw new Error("Expected at most one argument");
  }

  return new XPathString(value.asString());
}

function evaluate$D (context, base, substring) {
  if (!substring) {
    throw new Error("Expected two arguments");
  }

  base = base.asString();

  substring = substring.asString();

  var index = base.indexOf(substring);

  if (index === -1) {
    return new XPathString("");
  } else {
    return new XPathString(base.substring(index + substring.length));
  }
}

function evaluate$E (context, base, substring) {
  if (!substring) {
    throw new Error("Expected two arguments");
  }

  base = base.asString();

  substring = substring.asString();

  var index = base.indexOf(substring);

  if (index === -1) {
    return new XPathString("");
  } else {
    return new XPathString(base.substring(0, index));
  }
}

function evaluate$F (context, base, start, length) {
  if (!start) {
    throw new Error("Expected two or three arguments");
  }

  base = base.asString();

  start = Math.round(start.asNumber());

  if (isNaN(start) || start === Infinity || start === -Infinity) {
    return new XPathString("");
  }

  if (length) {
    length = Math.round(length.asNumber());

    if (isNaN(length) || length === -Infinity) {
      return new XPathString("");
    }
  }

  if (length) {
    return new XPathString(base.substring(start - 1, start + length - 1));
  } else {
    return new XPathString(base.substring(start - 1));
  }
}

function evaluate$G (context, nodeset) {
  if (arguments.length !== 2) {
    throw new Error("Expected a single argument");
  }

  if (!(nodeset instanceof XPathNodeSet)) {
    throw new Error("Wrong type of argument");
  }

  var sum = 0, node, iter = nodeset.iterator();

  while ((node = iter.next())) {
    sum = sum + node.asNumber();
  }

  return new XPathNumber(sum);
}

function evaluate$H (context, base, mapFrom, mapTo) {
  if (!mapTo) {
    throw new Error("Expected three arguments");
  }

  if (!(base instanceof XPathString) ||
      !(mapFrom instanceof XPathString) ||
      !(mapTo instanceof XPathString)) {
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

  return new XPathString(base);
}

function evaluate$I () {
  return new XPathBoolean(true);
}

var Functions = {
  "boolean": evaluate$k,
  "ceiling": evaluate$l,
  "concat": evaluate$m,
  "contains": evaluate$n,
  "count": evaluate$o,
  "false": evaluate$p,
  "floor": evaluate$q,
  "id": evaluate$r,
  "last": evaluate$s,
  "local-name": evaluate$t,
  "name": evaluate$u,
  "normalize-space": evaluate$v,
  "not": evaluate$w,
  "number": evaluate$x,
  "position": evaluate$y,
  "round": evaluate$z,
  "starts-with": evaluate$A,
  "string-length": evaluate$B,
  "string": evaluate$C,
  "substring-after": evaluate$D,
  "substring-before": evaluate$E,
  "substring": evaluate$F,
  "sum": evaluate$G,
  "translate": evaluate$H,
  "true": evaluate$I
};

function evaluate$J (rootEvaluator, ast, context, type) {
  var args = (ast.args || []).map(function (arg) {
    return rootEvaluator.evaluate(arg, context, type);
  });

  args.unshift(context);

  var functionEvaluator = Functions[ast.name];

  if (functionEvaluator) {
    return functionEvaluator.apply(null, args);
  } else {
    throw new Error("Unknown function " + ast.name);
  }
}

function evaluate$K (rootEvaluator, ast, context, type) {
  return compareNodes(
    ast.type,
    rootEvaluator.evaluate(ast.lhs, context, type),
    rootEvaluator.evaluate(ast.rhs, context, type),
    function (lhs, rhs) {
      return lhs > rhs;
    }
  );
}

function evaluate$L (rootEvaluator, ast, context, type) {
  return compareNodes(
    ast.type,
    rootEvaluator.evaluate(ast.lhs, context, type),
    rootEvaluator.evaluate(ast.rhs, context, type),
    function (lhs, rhs) {
      return lhs >= rhs;
    }
  );
}

function evaluate$M (rootEvaluator, ast, context, type) {
  return compareNodes(
    ast.type,
    rootEvaluator.evaluate(ast.lhs, context, type),
    rootEvaluator.evaluate(ast.rhs, context, type),
    function (lhs, rhs) {
      return lhs !== rhs;
    }
  );
}

function evaluate$N (rootEvaluator, ast, context, type) {
  return compareNodes(
    ast.type,
    rootEvaluator.evaluate(ast.lhs, context, type),
    rootEvaluator.evaluate(ast.rhs, context, type),
    function (lhs, rhs) {
      return lhs < rhs;
    }
  );
}

function evaluate$O (rootEvaluator, ast, context, type) {
  return compareNodes(
    ast.type,
    rootEvaluator.evaluate(ast.lhs, context, type),
    rootEvaluator.evaluate(ast.rhs, context, type),
    function (lhs, rhs) {
      return lhs <= rhs;
    }
  );
}

function evaluate$P (rootEvaluator, ast) {
  return new XPathString(ast.string);
}

function evaluate$Q (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathNumber(lhs.asNumber() % rhs.asNumber());
}

function evaluate$R (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathNumber(lhs.asNumber() * rhs.asNumber());
}

function evaluate$S (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  return new XPathNumber(-lhs.asNumber());
}

function evaluate$T (rootEvaluator, ast) {
  return new XPathNumber(ast.number);
}

function evaluate$U (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  if (lhs.asBoolean()) {
    return new XPathBoolean(true);
  }

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathBoolean(rhs.asBoolean());
}

function evaluate$V (rootEvaluator, ast, context, type) {
  var nodes = rootEvaluator.evaluate(ast.filter, context, type);

  if (ast.steps) {
    var nodeSets = [], node, iter = nodes.iterator();

    while ((node = iter.next())) {
      nodeSets.push(evaluate$d(rootEvaluator, ast, new Context(node, 1, 1), type));
    }

    nodes = nodeSets.reduce(function (previousValue, currentValue) {
      return previousValue.merge(currentValue);
    });
  }

  return nodes;
}

function evaluate$W (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return new XPathNumber(lhs.asNumber() - rhs.asNumber());
}

function evaluate$X (rootEvaluator, ast, context, type) {
  var lhs = rootEvaluator.evaluate(ast.lhs, context, type);

  var rhs = rootEvaluator.evaluate(ast.rhs, context, type);

  return lhs.merge(rhs);
}

var Evaluators = {};

Evaluators[ABSOLUTE_LOCATION_PATH] = evaluate$e;
Evaluators[ADDITIVE] = evaluate$f;
Evaluators[AND] = evaluate$g;
Evaluators[DIVISIONAL] = evaluate$h;
Evaluators[EQUALITY] = evaluate$i;
Evaluators[FILTER] = evaluate$j;
Evaluators[FUNCTION_CALL] = evaluate$J;
Evaluators[GREATER_THAN] = evaluate$K;
Evaluators[GREATER_THAN_OR_EQUAL] = evaluate$L;
Evaluators[INEQUALITY] = evaluate$M;
Evaluators[LESS_THAN] = evaluate$N;
Evaluators[LESS_THAN_OR_EQUAL] = evaluate$O;
Evaluators[LITERAL] = evaluate$P;
Evaluators[MODULUS] = evaluate$Q;
Evaluators[MULTIPLICATIVE] = evaluate$R;
Evaluators[NEGATION] = evaluate$S;
Evaluators[NUMBER] = evaluate$T;
Evaluators[OR] = evaluate$U;
Evaluators[PATH] = evaluate$V;
Evaluators[RELATIVE_LOCATION_PATH] = evaluate$d;
Evaluators[SUBTRACTIVE] = evaluate$W;
Evaluators[UNION] = evaluate$X;

class XPathExpression {
  constructor(expression) {
    this.expression = expression;
  }

  evaluate(context, type, Adapter) {
    var ast = new XPathAnalyzer(this.expression).parse();

    return XPathExpression.evaluate(ast, new Context(new Adapter(context), 1, 1), type);
  }

  static evaluate(ast, context, type) {
    var evaluator = Evaluators[ast.type];

    return evaluator(XPathExpression, ast, context, type);
  }
}

class XPathException {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

const TYPE_ERR = 52;

const ANY_TYPE = 0;
const NUMBER_TYPE = 1;
const STRING_TYPE = 2;
const BOOLEAN_TYPE = 3;
const UNORDERED_NODE_ITERATOR_TYPE = 4;
const ORDERED_NODE_ITERATOR_TYPE = 5;
const UNORDERED_NODE_SNAPSHOT_TYPE = 6;
const ORDERED_NODE_SNAPSHOT_TYPE = 7;
const ANY_UNORDERED_NODE_TYPE = 8;
const FIRST_ORDERED_NODE_TYPE = 9;

class XPathResult {
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

function throwNotImplemented () {
  throw new Error("Namespaces are not implemented");
}

class XPathEvaluator {
  constructor(adapter) {
    this.adapter = adapter;
  }

  evaluate(expression, context, nsResolver, type) {
    if (nsResolver) {
      throwNotImplemented();
    }
  
    var value = this.createExpression(expression).evaluate(context, type, this.adapter);
  
    return new XPathResult(type, value);
  }

  createExpression(expression, nsResolver) {
    if (nsResolver) {
      throwNotImplemented();
    }
  
    return new XPathExpression(expression);
  }

  createNSResolver() {
    throwNotImplemented();
  }
}

export default XPathEvaluator;
export { XPathResult };
