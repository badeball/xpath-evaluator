/// <reference types="node" />

export interface IAdapter<T> {
	getNativeNode(): T;
	asString(): string;
	asNumber(): number;
	getNodeType(): number;
	getChildNodes(): IAdapter<T>[];
	getFollowingSiblings(): IAdapter<T>[];
	getPrecedingSiblings(): IAdapter<T>[];
	getAttributes(): IAdapter<T>[];
	getParent(): IAdapter<T>;
	getOwnerDocument(): IAdapter<T>;
	getElementById(id: string): IAdapter<T> | null;
	getName(): string;
	isEqual(node: IAdapter<T>): boolean;
	compareDocumentPosition(node: IAdapter<T>): -1 | 0 | 1;
	toString(): string;
}
export declare type AdapterType<T> = new (nativeContext: T) => IAdapter<T>;
export declare const ANY_TYPE = 0;
export declare const NUMBER_TYPE = 1;
export declare const STRING_TYPE = 2;
export declare const BOOLEAN_TYPE = 3;
export declare const UNORDERED_NODE_ITERATOR_TYPE = 4;
export declare const ORDERED_NODE_ITERATOR_TYPE = 5;
export declare const UNORDERED_NODE_SNAPSHOT_TYPE = 6;
export declare const ORDERED_NODE_SNAPSHOT_TYPE = 7;
export declare const ANY_UNORDERED_NODE_TYPE = 8;
export declare const FIRST_ORDERED_NODE_TYPE = 9;
export declare type XPathResultType = typeof ANY_TYPE | typeof NUMBER_TYPE | typeof STRING_TYPE | typeof BOOLEAN_TYPE | typeof UNORDERED_NODE_ITERATOR_TYPE | typeof ORDERED_NODE_ITERATOR_TYPE | typeof UNORDERED_NODE_SNAPSHOT_TYPE | typeof ORDERED_NODE_SNAPSHOT_TYPE | typeof ANY_UNORDERED_NODE_TYPE | typeof FIRST_ORDERED_NODE_TYPE;
declare class XPathBoolean {
	private value;
	constructor(value: boolean);
	asString(): string;
	asNumber(): 1 | 0;
	asBoolean(): boolean;
}
declare class NodeWrapper<T> {
	node: T;
	next: NodeWrapper<T> | null;
	previous: NodeWrapper<T> | null;
	constructor(node: T);
}
declare class ListBounds<T> {
	head: NodeWrapper<T>;
	tail: NodeWrapper<T>;
	constructor(head: NodeWrapper<T>, tail: NodeWrapper<T>);
}
declare class EmptyIterator<T> implements IterableIterator<T> {
	[Symbol.iterator](): IterableIterator<T>;
	next(): IteratorResult<T>;
	remove(): void;
}
declare class Iterator<T> implements IterableIterator<T> {
	private list;
	private reversed;
	private current;
	private lastReturned;
	private i;
	constructor(list: LinkedList<T>, reversed?: boolean);
	[Symbol.iterator](): IterableIterator<T>;
	next(): IteratorResult<T>;
	remove(): void;
}
declare class LinkedList<T> {
	bounds_: ListBounds<T> | null;
	length_: number;
	constructor(nodes?: T[]);
	iterator(reversed?: boolean): Iterator<T> | EmptyIterator<T>;
	head(): NodeWrapper<T> | null;
	tail(): NodeWrapper<T> | null;
	length(): number;
	empty(): boolean;
	push(node: T): this;
	unshift(node: T): this;
	filter(condition: (node: T) => boolean): this;
}
declare class XPathNodeSet<T> extends LinkedList<IAdapter<T>> {
	asString(): string;
	first(): IAdapter<T> | null;
	last(): IAdapter<T> | null;
	asNumber(): number;
	asBoolean(): boolean;
	merge(b: XPathNodeSet<T>): XPathNodeSet<T>;
	toString(): string;
}
declare class XPathNumber {
	private value;
	constructor(value: number);
	asString(): string;
	asNumber(): number;
	asBoolean(): boolean;
}
declare class XPathString {
	private value;
	constructor(value: string);
	asString(): string;
	asNumber(): number;
	asBoolean(): boolean;
}
export declare type XPathValue<T> = XPathBoolean | XPathNodeSet<T> | XPathNumber | XPathString;
export declare class XPathResult<T> {
	private value;
	private nodes;
	private index;
	readonly resultType: XPathResultType;
	readonly numberValue: number;
	readonly stringValue: string;
	readonly booleanValue: boolean;
	readonly singleNodeValue: T | null;
	readonly snapshotLength: number;
	readonly invalidIteratorState: boolean;
	readonly ANY_TYPE = 0;
	readonly NUMBER_TYPE = 1;
	readonly STRING_TYPE = 2;
	readonly BOOLEAN_TYPE = 3;
	readonly UNORDERED_NODE_ITERATOR_TYPE = 4;
	readonly ORDERED_NODE_ITERATOR_TYPE = 5;
	readonly UNORDERED_NODE_SNAPSHOT_TYPE = 6;
	readonly ORDERED_NODE_SNAPSHOT_TYPE = 7;
	readonly ANY_UNORDERED_NODE_TYPE = 8;
	readonly FIRST_ORDERED_NODE_TYPE = 9;
	static readonly ANY_TYPE = 0;
	static readonly NUMBER_TYPE = 1;
	static readonly STRING_TYPE = 2;
	static readonly BOOLEAN_TYPE = 3;
	static readonly UNORDERED_NODE_ITERATOR_TYPE = 4;
	static readonly ORDERED_NODE_ITERATOR_TYPE = 5;
	static readonly UNORDERED_NODE_SNAPSHOT_TYPE = 6;
	static readonly ORDERED_NODE_SNAPSHOT_TYPE = 7;
	static readonly ANY_UNORDERED_NODE_TYPE = 8;
	static readonly FIRST_ORDERED_NODE_TYPE = 9;
	constructor(type: XPathResultType, value: XPathValue<T>);
	iterateNext(): T | null;
	snapshotItem(index: number): T | null;
}
declare class XPathExpression<T> {
	private ast;
	private adapter;
	constructor(expression: string, adapter: AdapterType<T>);
	evaluate(nativeContext: T, type: XPathResultType): XPathResult<T>;
}
export declare const ELEMENT_NODE = 1;
export declare const ATTRIBUTE_NODE = 2;
export declare const TEXT_NODE = 3;
export declare const CDATA_SECTION_NODE = 4;
export declare const ENTITY_REFERENCE_NODE = 5;
export declare const ENTITY_NODE = 6;
export declare const PROCESSING_INSTRUCTION_NODE = 7;
export declare const COMMENT_NODE = 8;
export declare const DOCUMENT_NODE = 9;
export declare const DOCUMENT_TYPE_NODE = 10;
export declare const DOCUMENT_FRAGMENT_NODE = 11;
export declare const NOTATION_NODE = 12;
export default class XPathEvaluator<T> {
	private adapter;
	constructor(adapter: AdapterType<T>);
	evaluate(expression: string, context: T, nsResolver: XPathNSResolver | ((prefix: string) => string | null) | null, type: XPathResultType, result?: XPathResult<T>): XPathResult<T>;
	createExpression(expression: string, nsResolver?: XPathNSResolver): XPathExpression<T>;
	createNSResolver(resolver?: Node): void;
}