'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var XPathAnalyzer = require('xpath-analyzer');
var XPathAnalyzer__default = _interopDefault(XPathAnalyzer);

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

class NodeWrapper {
    constructor(node) {
        this.node = node;
    }
}
class ListBounds {
    constructor(head, tail) {
        this.head = head;
        this.tail = tail;
    }
}
class EmptyIterator {
    [Symbol.iterator]() {
        return this;
    }
    next() {
        return {
            done: true,
            value: null
        };
    }
    remove() { }
}
class Iterator {
    constructor(list, reversed = false) {
        this.list = list;
        this.reversed = reversed;
        this.current = reversed ? list.tail() : list.head();
        this.lastReturned = null;
        this.i = 0;
    }
    [Symbol.iterator]() {
        return this;
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
            }
            else {
                this.current = this.current.next;
            }
            return {
                done: false,
                value: this.lastReturned.node
            };
        }
        else {
            /**
             * Somehwere along the road, iterators and strictNullChecks stopped working well together.
             *
             * @see https://github.com/Microsoft/TypeScript/issues/11375
             */
            return {
                done: true,
                value: null
            };
        }
    }
    remove() {
        if (!this.lastReturned) {
            throw new Error("Iterator.remove() was called before iterating");
        }
        if (!this.list.bounds_) {
            throw new Error("Iterator.remove() was somehow invoked on an empty list");
        }
        var next = this.lastReturned.next, previous = this.lastReturned.previous;
        if (next && previous) {
            next.previous = previous;
            previous.next = next;
        }
        else if (next) {
            next.previous = previous;
            this.list.bounds_.head = next;
        }
        else if (previous) {
            previous.next = next;
            this.list.bounds_.tail = previous;
        }
        else {
            this.list.bounds_ = null;
        }
        this.lastReturned = null;
        this.list.length_--;
    }
}
class LinkedList {
    constructor(nodes) {
        this.length_ = 0;
        if (nodes) {
            nodes.forEach(function (node) {
                this.push(node);
            }, this);
        }
    }
    iterator(reversed) {
        if (this.bounds_) {
            return new Iterator(this, reversed);
        }
        else {
            return new EmptyIterator();
        }
    }
    head() {
        return this.bounds_ && this.bounds_.head;
    }
    tail() {
        return this.bounds_ && this.bounds_.tail;
    }
    length() {
        return this.length_;
    }
    empty() {
        return this.length_ === 0;
    }
    push(node) {
        var entry = new NodeWrapper(node);
        if (this.bounds_) {
            entry.previous = this.bounds_.tail;
            this.bounds_.tail.next = entry;
            this.bounds_.tail = entry;
        }
        else {
            this.bounds_ = new ListBounds(entry, entry);
        }
        this.length_++;
        return this;
    }
    unshift(node) {
        var entry = new NodeWrapper(node);
        if (this.bounds_) {
            entry.next = this.bounds_.head;
            this.bounds_.head.previous = entry;
            this.bounds_.head = entry;
        }
        else {
            this.bounds_ = new ListBounds(entry, entry);
        }
        this.length_++;
        return this;
    }
    filter(condition) {
        var iter = this.iterator();
        for (var node of iter) {
            if (!condition(node)) {
                iter.remove();
            }
        }
        return this;
    }
}

class XPathNodeSet extends LinkedList {
    asString() {
        var first = this.first();
        if (first) {
            return first.asString();
        }
        else {
            return "";
        }
    }
    first() {
        return this.bounds_ && this.bounds_.head.node;
    }
    last() {
        return this.bounds_ && this.bounds_.tail.node;
    }
    asNumber() {
        return +this.asString();
    }
    asBoolean() {
        return this.length() !== 0;
    }
    merge(b) {
        var a = this;
        var merged = new XPathNodeSet();
        var aCurr = a.bounds_ && a.bounds_.head;
        var bCurr = b.bounds_ && b.bounds_.head;
        while (aCurr && bCurr) {
            if (aCurr.node.isEqual(bCurr.node)) {
                merged.push(aCurr.node);
                aCurr = aCurr.next;
                bCurr = bCurr.next;
            }
            else {
                var compareResult = aCurr.node.compareDocumentPosition(bCurr.node);
                if (compareResult > 0) {
                    merged.push(bCurr.node);
                    bCurr = bCurr.next;
                }
                else {
                    merged.push(aCurr.node);
                    aCurr = aCurr.next;
                }
            }
        }
        var next = aCurr || bCurr;
        while (next) {
            merged.push(next.node);
            next = next.next;
        }
        return merged;
    }
    toString() {
        var nodes = [];
        for (var node of this.iterator()) {
            nodes.push("" + node);
        }
        return "NodeSet<" + nodes.join(", ") + ">";
    }
}

const ELEMENT_NODE = 1;
const ATTRIBUTE_NODE = 2;
const TEXT_NODE = 3;
const CDATA_SECTION_NODE = 4;
const ENTITY_REFERENCE_NODE = 5;
const ENTITY_NODE = 6;
const PROCESSING_INSTRUCTION_NODE = 7;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;
const DOCUMENT_TYPE_NODE = 10;
const DOCUMENT_FRAGMENT_NODE = 11;
const NOTATION_NODE = 12;

function evaluate(rootEvaluator, context, type) {
    var nodes = new XPathNodeSet();
    if (context.getNode().getNodeType() !== DOCUMENT_NODE) {
        nodes = nodes.unshift(context.getNode().getParent());
        nodes = nodes.merge(evaluate(rootEvaluator, new Context(context.getNode().getParent(), 1, 1), type));
    }
    return nodes;
}

function evaluate$1(rootEvaluator, context, type) {
    var nodes = new XPathNodeSet([context.getNode()]);
    return evaluate(rootEvaluator, context, type).merge(nodes);
}

function evaluate$2(rootEvaluator, context, type) {
    return new XPathNodeSet(context.getNode().getAttributes());
}

function evaluate$3(rootEvaluator, context, type) {
    return new XPathNodeSet(context.getNode().getChildNodes());
}

function evaluate$4(rootEvaluator, context, type) {
    var nodes = new XPathNodeSet();
    var children = new XPathNodeSet(context.getNode().getChildNodes());
    for (var child of children.iterator()) {
        nodes = nodes.push(child);
        nodes = nodes.merge(evaluate$4(rootEvaluator, new Context(child, 1, 1), type));
    }
    return nodes;
}

function evaluate$5(rootEvaluator, context, type) {
    var nodes = new XPathNodeSet([context.getNode()]);
    return nodes.merge(evaluate$4(rootEvaluator, context, type));
}

function evaluate$6(rootEvaluator, context, type) {
    return rootEvaluator.evaluate({
        type: XPathAnalyzer.RELATIVE_LOCATION_PATH,
        steps: [{
                axis: XPathAnalyzer.ANCESTOR_OR_SELF,
                test: {
                    type: XPathAnalyzer.NODE_TYPE_TEST,
                    name: XPathAnalyzer.NODE
                },
                predicates: []
            }, {
                axis: XPathAnalyzer.FOLLOWING_SIBLING,
                test: {
                    type: XPathAnalyzer.NODE_TYPE_TEST,
                    name: XPathAnalyzer.NODE
                },
                predicates: []
            }, {
                axis: XPathAnalyzer.DESCENDANT_OR_SELF,
                test: {
                    type: XPathAnalyzer.NODE_TYPE_TEST,
                    name: XPathAnalyzer.NODE
                },
                predicates: []
            }]
    }, context, type);
}

function evaluate$7(rootEvaluator, context, type) {
    return new XPathNodeSet(context.getNode().getFollowingSiblings());
}

function evaluate$8(rootEvaluator, context, type) {
    throw new Error("Namespace axis is not implemented");
}

function evaluate$9(rootEvaluator, context, type) {
    var nodes = new XPathNodeSet();
    if (context.getNode().getNodeType() !== DOCUMENT_NODE) {
        nodes = nodes.push(context.getNode().getParent());
    }
    return nodes;
}

function evaluate$a(rootEvaluator, context, type) {
    return rootEvaluator.evaluate({
        type: XPathAnalyzer.RELATIVE_LOCATION_PATH,
        steps: [{
                axis: XPathAnalyzer.ANCESTOR_OR_SELF,
                test: {
                    type: XPathAnalyzer.NODE_TYPE_TEST,
                    name: XPathAnalyzer.NODE
                },
                predicates: []
            }, {
                axis: XPathAnalyzer.PRECEDING_SIBLING,
                test: {
                    type: XPathAnalyzer.NODE_TYPE_TEST,
                    name: XPathAnalyzer.NODE
                },
                predicates: []
            }, {
                axis: XPathAnalyzer.DESCENDANT_OR_SELF,
                test: {
                    type: XPathAnalyzer.NODE_TYPE_TEST,
                    name: XPathAnalyzer.NODE
                },
                predicates: []
            }]
    }, context, type);
}

function evaluate$b(rootEvaluator, context, type) {
    return new XPathNodeSet(context.getNode().getPrecedingSiblings());
}

function evaluate$c(rootEvaluator, context, type) {
    return new XPathNodeSet([context.getNode()]);
}

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

function getAxisEvaluator(axis) {
    switch (axis) {
        case XPathAnalyzer.ANCESTOR: return evaluate;
        case XPathAnalyzer.ANCESTOR_OR_SELF: return evaluate$1;
        case XPathAnalyzer.ATTRIBUTE: return evaluate$2;
        case XPathAnalyzer.CHILD: return evaluate$3;
        case XPathAnalyzer.DESCENDANT: return evaluate$4;
        case XPathAnalyzer.DESCENDANT_OR_SELF: return evaluate$5;
        case XPathAnalyzer.FOLLOWING: return evaluate$6;
        case XPathAnalyzer.FOLLOWING_SIBLING: return evaluate$7;
        case XPathAnalyzer.NAMESPACE: return evaluate$8;
        case XPathAnalyzer.PARENT: return evaluate$9;
        case XPathAnalyzer.PRECEDING: return evaluate$a;
        case XPathAnalyzer.PRECEDING_SIBLING: return evaluate$b;
        case XPathAnalyzer.SELF: return evaluate$c;
    }
}
function evaluate$d(rootEvaluator, ast, context, type) {
    var nodes = getAxisEvaluator(ast.axis)(rootEvaluator, context, type);
    var test = ast.test;
    if (test.type === XPathAnalyzer.NODE_NAME_TEST || (test.type == XPathAnalyzer.PROCESSING_INSTRUCTION_TEST && test.name)) {
        var name = ast.test.name;
        nodes = nodes.filter(function (node) {
            return (name === "*" && !!node.getName()) || node.getName() === ast.test.name;
        });
    }
    if ((test.type === XPathAnalyzer.NODE_TYPE_TEST && test.name !== XPathAnalyzer.NODE) || test.type === XPathAnalyzer.PROCESSING_INSTRUCTION_TEST) {
        var nodeType;
        if (test.type === XPathAnalyzer.NODE_TYPE_TEST) {
            switch (test.name) {
                case XPathAnalyzer.COMMENT:
                    nodeType = COMMENT_NODE;
                    break;
                case XPathAnalyzer.PROCESSING_INSTRUCTION:
                    nodeType = PROCESSING_INSTRUCTION_NODE;
                    break;
                case XPathAnalyzer.TEXT:
                    nodeType = TEXT_NODE;
                    break;
                default:
                    throw new Error("Unknown node nodeType " + test.name);
            }
        }
        else {
            nodeType = PROCESSING_INSTRUCTION_NODE;
        }
        nodes = nodes.filter(function (node) {
            return node.getNodeType() === nodeType;
        });
    }
    if (ast.predicates.length > 0) {
        var reversed = (ast.axis === XPathAnalyzer.ANCESTOR ||
            ast.axis === XPathAnalyzer.ANCESTOR_OR_SELF ||
            ast.axis === XPathAnalyzer.PRECEDING ||
            ast.axis === XPathAnalyzer.PRECEDING_SIBLING);
        var position = 0, length = nodes.length(), iter = nodes.iterator(reversed);
        for (var node of iter) {
            position++;
            var keep = ast.predicates.every(function (predicate) {
                var result = rootEvaluator.evaluate(predicate, new Context(node, position, length), type);
                if (result === null) {
                    return false;
                }
                if (result instanceof XPathNumber) {
                    return result.asNumber() === position;
                }
                else {
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

function evaluate$e(rootEvaluator, ast, context, type) {
    var nodeSet = new XPathNodeSet([context.getNode()]), nextNodeSet = new XPathNodeSet();
    if (ast.steps) {
        for (var i = 0; i < ast.steps.length; i++) {
            for (var node of nodeSet.iterator()) {
                var stepResult = evaluate$d(rootEvaluator, ast.steps[i], new Context(node, 1, 1), type);
                nextNodeSet = nextNodeSet.merge(stepResult);
            }
            nodeSet = nextNodeSet;
            nextNodeSet = new XPathNodeSet();
        }
    }
    return nodeSet;
}

function evaluate$f(rootEvaluator, ast, context, type) {
    return evaluate$e(rootEvaluator, {
        type: XPathAnalyzer.RELATIVE_LOCATION_PATH,
        steps: ast.steps
    }, new Context(context.getNode().getOwnerDocument(), 1, 1), type);
}

function evaluate$g(rootEvaluator, ast, context, type) {
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

function evaluate$h(rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);
    if (!lhs.asBoolean()) {
        return new XPathBoolean(false);
    }
    var rhs = rootEvaluator.evaluate(ast.rhs, context, type);
    return new XPathBoolean(rhs.asBoolean());
}

function evaluate$i(rootEvaluator, ast, context, type) {
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

function compareNodes(type, lhs, rhs, comparator) {
    if (lhs instanceof XPathNodeSet && rhs instanceof XPathNodeSet) {
        for (var lNode of lhs.iterator()) {
            for (var rNode of rhs.iterator()) {
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
        }
        else {
            nodeSet = rhs;
            primitive = lhs;
        }
        if (primitive instanceof XPathBoolean) {
            if (comparator(nodeSet.asBoolean(), primitive.asBoolean())) {
                return new XPathBoolean(true);
            }
        }
        else {
            for (var node of nodeSet.iterator()) {
                if (primitive instanceof XPathNumber) {
                    if (comparator(node.asNumber(), primitive.asNumber())) {
                        return new XPathBoolean(true);
                    }
                }
                else if (primitive instanceof XPathString) {
                    if (comparator(node.asString(), primitive.asString())) {
                        return new XPathBoolean(true);
                    }
                }
                else {
                    throw new Error("Unknown value type");
                }
            }
        }
        return new XPathBoolean(false);
    }
    // Neither object is a NodeSet at this point.
    if (type === XPathAnalyzer.EQUALITY ||
        type === XPathAnalyzer.INEQUALITY) {
        if (lhs instanceof XPathBoolean || rhs instanceof XPathBoolean) {
            if (comparator(lhs.asBoolean(), rhs.asBoolean())) {
                return new XPathBoolean(true);
            }
        }
        else if (lhs instanceof XPathNumber || rhs instanceof XPathNumber) {
            if (comparator(lhs.asNumber(), rhs.asNumber())) {
                return new XPathBoolean(true);
            }
        }
        else if (lhs instanceof XPathString || rhs instanceof XPathString) {
            if (comparator(lhs.asString(), rhs.asString())) {
                return new XPathBoolean(true);
            }
        }
        else {
            throw new Error("Unknown value types");
        }
        return new XPathBoolean(false);
    }
    else {
        return new XPathBoolean(comparator(lhs.asNumber(), rhs.asNumber()));
    }
}

function evaluate$j(rootEvaluator, ast, context, type) {
    return compareNodes(ast.type, rootEvaluator.evaluate(ast.lhs, context, type), rootEvaluator.evaluate(ast.rhs, context, type), function (lhs, rhs) {
        return lhs === rhs;
    });
}

function evaluate$k(rootEvaluator, ast, context, type) {
    const nodes = rootEvaluator.evaluate(ast.primary, context, type);
    if (!(nodes instanceof XPathNodeSet)) {
        throw new Error("Predicates can only be used when primary expression yields a node-set");
    }
    var position = 0, length = nodes.length(), iter = nodes.iterator();
    for (var node of iter) {
        position++;
        var keep = ast.predicates.every(function (predicate) {
            var result = rootEvaluator.evaluate(predicate, new Context(node, position, length), type);
            if (result === null) {
                return false;
            }
            if (result instanceof XPathNumber) {
                return result.asNumber() === position;
            }
            else {
                return result.asBoolean();
            }
        });
        if (!keep) {
            iter.remove();
        }
    }
    return nodes;
}

function evaluate$l(context, ...args) {
    if (args.length !== 1) {
        throw new Error("Expected a single argument");
    }
    return new XPathBoolean(args[0].asBoolean());
}

function evaluate$m(context, ...args) {
    if (args.length !== 1) {
        throw new Error("Expected a single argument");
    }
    var number = args[0];
    if (!(number instanceof XPathNumber)) {
        throw new Error("Wrong type of argument");
    }
    return new XPathNumber(Math.ceil(number.asNumber()));
}

function evaluate$n(context, ...args) {
    if (args.length === 0) {
        throw new Error("Expected some arguments");
    }
    return new XPathString(args.map(function (arg) {
        return arg.asString();
    }).join(""));
}

function evaluate$o(context, ...args) {
    if (args.length !== 2) {
        throw new Error("Expected two arguments");
    }
    var base = args[0].asString();
    var contains = args[1].asString();
    return new XPathBoolean(base.indexOf(contains) !== -1);
}

function evaluate$p(context, ...args) {
    if (args.length !== 1) {
        throw new Error("Expected a single argument");
    }
    var nodeset = args[0];
    if (!(nodeset instanceof XPathNodeSet)) {
        throw new Error("Wrong type of argument");
    }
    return new XPathNumber(nodeset.length());
}

function evaluate$q(context, ...args) {
    return new XPathBoolean(false);
}

function evaluate$r(context, ...args) {
    if (args.length !== 1) {
        throw new Error("Expected a single argument");
    }
    var number = args[0];
    if (!(number instanceof XPathNumber)) {
        throw new Error("Wrong type of argument");
    }
    return new XPathNumber(Math.floor(number.asNumber()));
}

function evaluate$s(context, ...args) {
    if (args.length !== 1) {
        throw new Error("Expected a single argument");
    }
    var value = args[0];
    var node, ids = [];
    if (value instanceof XPathNodeSet) {
        for (node of value.iterator()) {
            ids = ids.concat(node.asString().split(/\s+/g));
        }
    }
    else if (value instanceof XPathString) {
        ids = value.asString().split(/\s+/g);
    }
    else {
        ids.push(value.asString());
    }
    var nodes = new XPathNodeSet();
    for (var i = 0; i < ids.length; i++) {
        node = context.getNode().getOwnerDocument().getElementById(ids[i]);
        if (node) {
            nodes = nodes.merge(new XPathNodeSet([node]));
        }
    }
    return nodes;
}

function evaluate$t(context, ...args) {
    return new XPathNumber(context.getLast());
}

function evaluate$u(context, ...args) {
    var nodeset = args[0];
    if (!nodeset) {
        nodeset = new XPathNodeSet([context.getNode()]);
    }
    if (args.length > 1) {
        throw new Error("Expected at most one argument");
    }
    if (!(nodeset instanceof XPathNodeSet)) {
        throw new Error("Wrong type of argument");
    }
    var first = nodeset.first();
    if (first) {
        return new XPathString(first.getName());
    }
    else {
        return new XPathString("");
    }
}

function evaluate$v(context, ...args) {
    var nodeset = args[0];
    if (!nodeset) {
        return new XPathString(context.getNode().getName());
    }
    else {
        if (args.length > 1) {
            throw new Error("Expected at most one argument");
        }
        if (!(nodeset instanceof XPathNodeSet)) {
            throw new Error("Wrong type of argument");
        }
        if (nodeset.empty()) {
            return new XPathString("");
        }
        else {
            return new XPathString(nodeset.first().getName());
        }
    }
}

function evaluate$w(context, ...args) {
    var value = args[0];
    var string;
    if (!value) {
        string = context.getNode().asString();
    }
    else {
        if (args.length > 1) {
            throw new Error("Expected at most one argument");
        }
        string = value.asString();
    }
    return new XPathString(string.trim().replace(/\s{2,}/g, " "));
}

function evaluate$x(context, ...args) {
    if (args.length !== 1) {
        throw new Error("Expected a single argument");
    }
    return new XPathBoolean(!args[0].asBoolean());
}

function evaluate$y(context, ...args) {
    if (args.length !== 1) {
        throw new Error("Expected a single argument");
    }
    return new XPathNumber(args[0].asNumber());
}

function evaluate$z(context, ...args) {
    return new XPathNumber(context.getPosition());
}

function evaluate$A(context, ...args) {
    if (args.length !== 1) {
        throw new Error("Expected a single argument");
    }
    var number = args[0];
    if (!(number instanceof XPathNumber)) {
        throw new Error("Wrong type of argument");
    }
    return new XPathNumber(Math.round(number.asNumber()));
}

function evaluate$B(context, ...args) {
    if (args.length !== 2) {
        throw new Error("Expected two arguments");
    }
    var base = args[0].asString();
    var substring = args[1].asString();
    var index = base.indexOf(substring);
    return new XPathBoolean(index === 0);
}

function evaluate$C(context, ...args) {
    var string = args[0];
    if (!string) {
        return new XPathNumber(context.getNode().asString().length);
    }
    else {
        if (args.length > 1) {
            throw new Error("Expected at most one argument");
        }
        if (!(string instanceof XPathString)) {
            throw new Error("Wrong type of argument");
        }
        return new XPathNumber(string.asString().length);
    }
}

function evaluate$D(context, ...args) {
    var value = args[0];
    if (!value) {
        value = new XPathNodeSet([context.getNode()]);
    }
    if (args.length > 1) {
        throw new Error("Expected at most one argument");
    }
    return new XPathString(value.asString());
}

function evaluate$E(context, ...args) {
    if (args.length !== 2) {
        throw new Error("Expected two arguments");
    }
    var base = args[0].asString();
    var substring = args[1].asString();
    var index = base.indexOf(substring);
    if (index === -1) {
        return new XPathString("");
    }
    else {
        return new XPathString(base.substring(index + substring.length));
    }
}

function evaluate$F(context, ...args) {
    if (args.length !== 2) {
        throw new Error("Expected two arguments");
    }
    var base = args[0].asString();
    var substring = args[1].asString();
    var index = base.indexOf(substring);
    if (index === -1) {
        return new XPathString("");
    }
    else {
        return new XPathString(base.substring(0, index));
    }
}

function evaluate$G(context, ...args) {
    if (args.length !== 2 && args.length !== 3) {
        throw new Error("Expected two or three arguments");
    }
    var base = args[0].asString();
    var start = Math.round(args[1].asNumber());
    var length = args[2];
    if (isNaN(start) || start === Infinity || start === -Infinity) {
        return new XPathString("");
    }
    if (length) {
        var roundedLength = Math.round(length.asNumber());
        if (isNaN(roundedLength) || roundedLength === -Infinity) {
            return new XPathString("");
        }
        return new XPathString(base.substring(start - 1, start + roundedLength - 1));
    }
    else {
        return new XPathString(base.substring(start - 1));
    }
}

function evaluate$H(context, ...args) {
    if (args.length !== 1) {
        throw new Error("Expected a single argument");
    }
    var nodeset = args[0];
    if (!(nodeset instanceof XPathNodeSet)) {
        throw new Error("Wrong type of argument");
    }
    var sum = 0;
    for (var node of nodeset.iterator()) {
        sum = sum + node.asNumber();
    }
    return new XPathNumber(sum);
}

function evaluate$I(context, ...args) {
    if (args.length !== 3) {
        throw new Error("Expected three arguments");
    }
    if (!(args[0] instanceof XPathString) ||
        !(args[1] instanceof XPathString) ||
        !(args[2] instanceof XPathString)) {
        throw new Error("Expected string arguments");
    }
    var base = args[0].asString(), mapFrom = args[1].asString(), mapTo = args[2].asString();
    for (var i = 0; i < mapFrom.length; i++) {
        if (i < mapTo.length) {
            base = base.replace(new RegExp(mapFrom[i], "g"), mapTo[i]);
        }
        else {
            base = base.replace(new RegExp(mapFrom[i], "g"), "");
        }
    }
    return new XPathString(base);
}

function evaluate$J(context, ...args) {
    return new XPathBoolean(true);
}

function getFunctionEvaluator(name) {
    switch (name) {
        case XPathAnalyzer.BOOLEAN: return evaluate$l;
        case XPathAnalyzer.CEILING: return evaluate$m;
        case XPathAnalyzer.CONCAT: return evaluate$n;
        case XPathAnalyzer.CONTAINS: return evaluate$o;
        case XPathAnalyzer.COUNT: return evaluate$p;
        case XPathAnalyzer.FALSE: return evaluate$q;
        case XPathAnalyzer.FLOOR: return evaluate$r;
        case XPathAnalyzer.ID: return evaluate$s;
        case XPathAnalyzer.LAST: return evaluate$t;
        case XPathAnalyzer.LOCAL_NAME: return evaluate$u;
        case XPathAnalyzer.NAME: return evaluate$v;
        case XPathAnalyzer.NORMALIZE_SPACE: return evaluate$w;
        case XPathAnalyzer.NOT: return evaluate$x;
        case XPathAnalyzer.NUMBER: return evaluate$y;
        case XPathAnalyzer.POSITION: return evaluate$z;
        case XPathAnalyzer.ROUND: return evaluate$A;
        case XPathAnalyzer.STARTS_WITH: return evaluate$B;
        case XPathAnalyzer.STRING_LENGTH: return evaluate$C;
        case XPathAnalyzer.STRING: return evaluate$D;
        case XPathAnalyzer.SUBSTRING_AFTER: return evaluate$E;
        case XPathAnalyzer.SUBSTRING_BEFORE: return evaluate$F;
        case XPathAnalyzer.SUBSTRING: return evaluate$G;
        case XPathAnalyzer.SUM: return evaluate$H;
        case XPathAnalyzer.TRANSLATE: return evaluate$I;
        case XPathAnalyzer.TRUE: return evaluate$J;
    }
}
function evaluate$K(rootEvaluator, ast, context, type) {
    var args = ast.args.map(function (arg) {
        return rootEvaluator.evaluate(arg, context, type);
    });
    return getFunctionEvaluator(ast.name)(context, ...args);
}

function evaluate$L(rootEvaluator, ast, context, type) {
    return compareNodes(ast.type, rootEvaluator.evaluate(ast.lhs, context, type), rootEvaluator.evaluate(ast.rhs, context, type), function (lhs, rhs) {
        return lhs > rhs;
    });
}

function evaluate$M(rootEvaluator, ast, context, type) {
    return compareNodes(ast.type, rootEvaluator.evaluate(ast.lhs, context, type), rootEvaluator.evaluate(ast.rhs, context, type), function (lhs, rhs) {
        return lhs >= rhs;
    });
}

function evaluate$N(rootEvaluator, ast, context, type) {
    return compareNodes(ast.type, rootEvaluator.evaluate(ast.lhs, context, type), rootEvaluator.evaluate(ast.rhs, context, type), function (lhs, rhs) {
        return lhs !== rhs;
    });
}

function evaluate$O(rootEvaluator, ast, context, type) {
    return compareNodes(ast.type, rootEvaluator.evaluate(ast.lhs, context, type), rootEvaluator.evaluate(ast.rhs, context, type), function (lhs, rhs) {
        return lhs < rhs;
    });
}

function evaluate$P(rootEvaluator, ast, context, type) {
    return compareNodes(ast.type, rootEvaluator.evaluate(ast.lhs, context, type), rootEvaluator.evaluate(ast.rhs, context, type), function (lhs, rhs) {
        return lhs <= rhs;
    });
}

function evaluate$Q(rootEvaluator, ast, context, type) {
    return new XPathString(ast.string);
}

function evaluate$R(rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);
    var rhs = rootEvaluator.evaluate(ast.rhs, context, type);
    return new XPathNumber(lhs.asNumber() % rhs.asNumber());
}

function evaluate$S(rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);
    var rhs = rootEvaluator.evaluate(ast.rhs, context, type);
    return new XPathNumber(lhs.asNumber() * rhs.asNumber());
}

function evaluate$T(rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);
    return new XPathNumber(-lhs.asNumber());
}

function evaluate$U(rootEvaluator, ast, context, type) {
    return new XPathNumber(ast.number);
}

function evaluate$V(rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);
    if (lhs.asBoolean()) {
        return new XPathBoolean(true);
    }
    var rhs = rootEvaluator.evaluate(ast.rhs, context, type);
    return new XPathBoolean(rhs.asBoolean());
}

function evaluate$W(rootEvaluator, ast, context, type) {
    var nodes = rootEvaluator.evaluate(ast.filter, context, type);
    if (!(nodes instanceof XPathNodeSet)) {
        throw new Error("Paths can only be used when filter expression yields a node-set");
    }
    var nodeSets = [];
    for (var node of nodes.iterator()) {
        nodeSets.push(evaluate$e(rootEvaluator, {
            type: XPathAnalyzer.RELATIVE_LOCATION_PATH,
            steps: ast.steps
        }, new Context(node, 1, 1), type));
    }
    return nodeSets.reduce(function (previousValue, currentValue) {
        return previousValue.merge(currentValue);
    });
}

function evaluate$X(rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);
    var rhs = rootEvaluator.evaluate(ast.rhs, context, type);
    return new XPathNumber(lhs.asNumber() - rhs.asNumber());
}

function evaluate$Y(rootEvaluator, ast, context, type) {
    var lhs = rootEvaluator.evaluate(ast.lhs, context, type);
    if (!(lhs instanceof XPathNodeSet)) {
        throw new Error("Union operator can only be used with expression yielding node-set");
    }
    var rhs = rootEvaluator.evaluate(ast.rhs, context, type);
    if (!(rhs instanceof XPathNodeSet)) {
        throw new Error("Union operator can only be used with expression yielding node-set");
    }
    return lhs.merge(rhs);
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
        this.invalidIteratorState = false;
        this.ANY_TYPE = ANY_TYPE;
        this.NUMBER_TYPE = NUMBER_TYPE;
        this.STRING_TYPE = STRING_TYPE;
        this.BOOLEAN_TYPE = BOOLEAN_TYPE;
        this.UNORDERED_NODE_ITERATOR_TYPE = UNORDERED_NODE_ITERATOR_TYPE;
        this.ORDERED_NODE_ITERATOR_TYPE = ORDERED_NODE_ITERATOR_TYPE;
        this.UNORDERED_NODE_SNAPSHOT_TYPE = UNORDERED_NODE_SNAPSHOT_TYPE;
        this.ORDERED_NODE_SNAPSHOT_TYPE = ORDERED_NODE_SNAPSHOT_TYPE;
        this.ANY_UNORDERED_NODE_TYPE = ANY_UNORDERED_NODE_TYPE;
        this.FIRST_ORDERED_NODE_TYPE = FIRST_ORDERED_NODE_TYPE;
        this.value = value;
        if (type === ANY_TYPE) {
            if (value instanceof XPathNodeSet) {
                this.resultType = UNORDERED_NODE_ITERATOR_TYPE;
            }
            else if (value instanceof XPathString) {
                this.resultType = STRING_TYPE;
            }
            else if (value instanceof XPathNumber) {
                this.resultType = NUMBER_TYPE;
            }
            else if (value instanceof XPathBoolean) {
                this.resultType = BOOLEAN_TYPE;
            }
            else {
                throw new Error("Unexpected evaluation result");
            }
        }
        else {
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
            for (var node of this.value.iterator()) {
                this.nodes.push(node.getNativeNode());
            }
        }
        var self = this;
        var hasDefineProperty = true;
        try {
            Object.defineProperty({}, "x", {});
        }
        catch (e) {
            hasDefineProperty = false;
        }
        if (hasDefineProperty) {
            Object.defineProperty(this, "numberValue", { get: function () {
                    if (self.resultType !== NUMBER_TYPE) {
                        throw new XPathException(TYPE_ERR, "resultType is not NUMBER_TYPE");
                    }
                    return self.value.asNumber();
                } });
            Object.defineProperty(this, "stringValue", { get: function () {
                    if (self.resultType !== STRING_TYPE) {
                        throw new XPathException(TYPE_ERR, "resultType is not STRING_TYPE");
                    }
                    return self.value.asString();
                } });
            Object.defineProperty(this, "booleanValue", { get: function () {
                    if (self.resultType !== BOOLEAN_TYPE) {
                        throw new XPathException(TYPE_ERR, "resultType is not BOOLEAN_TYPE");
                    }
                    return self.value.asBoolean();
                } });
            Object.defineProperty(this, "singleNodeValue", { get: function () {
                    if (self.resultType !== FIRST_ORDERED_NODE_TYPE &&
                        self.resultType !== ANY_UNORDERED_NODE_TYPE) {
                        throw new XPathException(TYPE_ERR, "resultType is not a node set");
                    }
                    var first = self.value.first();
                    return first && first.getNativeNode();
                } });
            Object.defineProperty(this, "invalidIteratorState", { get: function () {
                    throw new Error("invalidIteratorState is not implemented");
                } });
            Object.defineProperty(this, "snapshotLength", { get: function () {
                    if (self.resultType !== ORDERED_NODE_SNAPSHOT_TYPE &&
                        self.resultType !== UNORDERED_NODE_SNAPSHOT_TYPE) {
                        throw new XPathException(TYPE_ERR, "resultType is not a node set");
                    }
                    return self.value.length();
                } });
        }
        else {
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
                var first = this.value.first();
                this.singleNodeValue = first && first.getNativeNode();
            }
            if (this.resultType === ORDERED_NODE_SNAPSHOT_TYPE ||
                this.resultType === UNORDERED_NODE_SNAPSHOT_TYPE) {
                this.snapshotLength = this.value.length();
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

class XPathExpression {
    constructor(expression, adapter) {
        this.ast = new XPathAnalyzer__default(expression).parse();
        this.adapter = adapter;
    }
    evaluate(nativeContext, type) {
        var Adapter = this.adapter;
        var evaluate = (ast, context, type) => {
            switch (ast.type) {
                case XPathAnalyzer.ABSOLUTE_LOCATION_PATH:
                    return evaluate$f({ evaluate }, ast, context, type);
                case XPathAnalyzer.ADDITIVE:
                    return evaluate$g({ evaluate }, ast, context, type);
                case XPathAnalyzer.AND:
                    return evaluate$h({ evaluate }, ast, context, type);
                case XPathAnalyzer.DIVISIONAL:
                    return evaluate$i({ evaluate }, ast, context, type);
                case XPathAnalyzer.EQUALITY:
                    return evaluate$j({ evaluate }, ast, context, type);
                case XPathAnalyzer.FILTER:
                    return evaluate$k({ evaluate }, ast, context, type);
                case XPathAnalyzer.FUNCTION_CALL:
                    return evaluate$K({ evaluate }, ast, context, type);
                case XPathAnalyzer.GREATER_THAN:
                    return evaluate$L({ evaluate }, ast, context, type);
                case XPathAnalyzer.GREATER_THAN_OR_EQUAL:
                    return evaluate$M({ evaluate }, ast, context, type);
                case XPathAnalyzer.INEQUALITY:
                    return evaluate$N({ evaluate }, ast, context, type);
                case XPathAnalyzer.LESS_THAN:
                    return evaluate$O({ evaluate }, ast, context, type);
                case XPathAnalyzer.LESS_THAN_OR_EQUAL:
                    return evaluate$P({ evaluate }, ast, context, type);
                case XPathAnalyzer.LITERAL:
                    return evaluate$Q({ evaluate }, ast, context, type);
                case XPathAnalyzer.MODULUS:
                    return evaluate$R({ evaluate }, ast, context, type);
                case XPathAnalyzer.MULTIPLICATIVE:
                    return evaluate$S({ evaluate }, ast, context, type);
                case XPathAnalyzer.NEGATION:
                    return evaluate$T({ evaluate }, ast, context, type);
                case XPathAnalyzer.NUMBER:
                    return evaluate$U({ evaluate }, ast, context, type);
                case XPathAnalyzer.OR:
                    return evaluate$V({ evaluate }, ast, context, type);
                case XPathAnalyzer.PATH:
                    return evaluate$W({ evaluate }, ast, context, type);
                case XPathAnalyzer.RELATIVE_LOCATION_PATH:
                    return evaluate$e({ evaluate }, ast, context, type);
                case XPathAnalyzer.SUBTRACTIVE:
                    return evaluate$X({ evaluate }, ast, context, type);
                case XPathAnalyzer.UNION:
                    return evaluate$Y({ evaluate }, ast, context, type);
            }
        };
        var value = evaluate(this.ast, new Context(new Adapter(nativeContext), 1, 1), type);
        return new XPathResult(type, value);
    }
}

function throwNotImplemented() {
    throw new Error("Namespaces are not implemented");
}
class XPathEvaluator {
    constructor(adapter) {
        this.adapter = adapter;
    }
    evaluate(expression, context, nsResolver, type, result) {
        if (nsResolver) {
            throwNotImplemented();
        }
        return this.createExpression(expression).evaluate(context, type);
    }
    createExpression(expression, nsResolver) {
        if (nsResolver) {
            throwNotImplemented();
        }
        return new XPathExpression(expression, this.adapter);
    }
    createNSResolver(resolver) {
        throwNotImplemented();
    }
}

exports.default = XPathEvaluator;
exports.XPathResult = XPathResult;
exports.ELEMENT_NODE = ELEMENT_NODE;
exports.ATTRIBUTE_NODE = ATTRIBUTE_NODE;
exports.TEXT_NODE = TEXT_NODE;
exports.CDATA_SECTION_NODE = CDATA_SECTION_NODE;
exports.ENTITY_REFERENCE_NODE = ENTITY_REFERENCE_NODE;
exports.ENTITY_NODE = ENTITY_NODE;
exports.PROCESSING_INSTRUCTION_NODE = PROCESSING_INSTRUCTION_NODE;
exports.COMMENT_NODE = COMMENT_NODE;
exports.DOCUMENT_NODE = DOCUMENT_NODE;
exports.DOCUMENT_TYPE_NODE = DOCUMENT_TYPE_NODE;
exports.DOCUMENT_FRAGMENT_NODE = DOCUMENT_FRAGMENT_NODE;
exports.NOTATION_NODE = NOTATION_NODE;
