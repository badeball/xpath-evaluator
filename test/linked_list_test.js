import * as Assert from "assert";

import LinkedList from "../lib/linked_list";

describe("XPathEvaluator", () => {
  describe("LinkedList", () => {
    describe("it should exhibit common linked list properties when initialized with a collection", function () {
      var list = new LinkedList(["foo", "bar", "baz"]);

      Assert.equal(false, list.empty());
      Assert.equal(3, list.length());
      Assert.equal(list.head().node, "foo");
      Assert.equal(list.head().next.node, "bar");
      Assert.equal(list.head().next.next.node, "baz");
      Assert.equal(list.head().next.next.next, null);
      Assert.equal(list.tail().node, "baz");
      Assert.equal(list.tail().previous.node, "bar");
      Assert.equal(list.tail().previous.previous.node, "foo");
      Assert.equal(list.tail().previous.previous.previous, null);
    });

    describe("it should exhibit common linked list properties when populated (push) after initialization", function () {
      var list = new LinkedList();

      list.push("foo");
      list.push("bar");
      list.push("baz");

      Assert.equal(false, list.empty());
      Assert.equal(3, list.length());
      Assert.equal(list.head().node, "foo");
      Assert.equal(list.head().next.node, "bar");
      Assert.equal(list.head().next.next.node, "baz");
      Assert.equal(list.head().next.next.next, null);
      Assert.equal(list.tail().node, "baz");
      Assert.equal(list.tail().previous.node, "bar");
      Assert.equal(list.tail().previous.previous.node, "foo");
      Assert.equal(list.tail().previous.previous.previous, null);
    });

    describe("it should exhibit common linked list properties when populated (unshift) after initialization", function () {
      var list = new LinkedList();

      list.unshift("baz");
      list.unshift("bar");
      list.unshift("foo");

      Assert.equal(false, list.empty());
      Assert.equal(3, list.length());
      Assert.equal(list.head().node, "foo");
      Assert.equal(list.head().next.node, "bar");
      Assert.equal(list.head().next.next.node, "baz");
      Assert.equal(list.head().next.next.next, null);
      Assert.equal(list.tail().node, "baz");
      Assert.equal(list.tail().previous.node, "bar");
      Assert.equal(list.tail().previous.previous.node, "foo");
      Assert.equal(list.tail().previous.previous.previous, null);
    });

    it("should support forward iteration", () => {
      var iterator = new LinkedList(["foo", "bar", "baz"]).iterator();

      Assert.equal("foo", iterator.next().value);
      Assert.equal("bar", iterator.next().value);
      Assert.equal("baz", iterator.next().value);
      Assert.equal(null, iterator.next().value);
    });

    it("should support reversed iteration", () => {
      var iterator = new LinkedList(["foo", "bar", "baz"]).iterator(true);

      Assert.equal("baz", iterator.next().value);
      Assert.equal("bar", iterator.next().value);
      Assert.equal("foo", iterator.next().value);
      Assert.equal(null, iterator.next().value);
    });

    it("should act as a native iterable", () => {
      var iterator = new LinkedList(["foo", "bar", "baz"]).iterator();

      var iterationResult = [];

      for (var node of iterator) {
        iterationResult.push(node);
      }

      Assert.deepEqual(["foo", "bar", "baz"], iterationResult);
    });

    it("should support removing head element during forward iteration", () => {
      var list = new LinkedList(["foo", "bar", "baz"]);
      var iterator = list.iterator();

      Assert.equal("foo", iterator.next().value);
      iterator.remove();
      Assert.equal("bar", iterator.next().value);
      Assert.equal("baz", iterator.next().value);
      Assert.equal(null, iterator.next().value);

      Assert.equal(2, list.length());
      Assert.equal(list.head().node, "bar");
      Assert.equal(list.head().next.node, "baz");
      Assert.equal(list.head().next.next, null);
      Assert.equal(list.tail().node, "baz");
      Assert.equal(list.tail().previous.node, "bar");
      Assert.equal(list.tail().previous.previous, null);
    });

    it("should support removing non-edge elements during forward iteration", () => {
      var list = new LinkedList(["foo", "bar", "baz"]);
      var iterator = list.iterator();

      Assert.equal("foo", iterator.next().value);
      Assert.equal("bar", iterator.next().value);
      iterator.remove();
      Assert.equal("baz", iterator.next().value);
      Assert.equal(null, iterator.next().value);

      Assert.equal(2, list.length());
      Assert.equal(list.head().node, "foo");
      Assert.equal(list.head().next.node, "baz");
      Assert.equal(list.head().next.next, null);
      Assert.equal(list.tail().node, "baz");
      Assert.equal(list.tail().previous.node, "foo");
      Assert.equal(list.tail().previous.previous, null);
    });

    it("should support removing tail element during forward iteration", () => {
      var list = new LinkedList(["foo", "bar", "baz"]);
      var iterator = list.iterator();

      Assert.equal("foo", iterator.next().value);
      Assert.equal("bar", iterator.next().value);
      Assert.equal("baz", iterator.next().value);
      iterator.remove();
      Assert.equal(null, iterator.next().value);

      Assert.equal(2, list.length());
      Assert.equal(list.head().node, "foo");
      Assert.equal(list.head().next.node, "bar");
      Assert.equal(list.head().next.next, null);
      Assert.equal(list.tail().node, "bar");
      Assert.equal(list.tail().previous.node, "foo");
      Assert.equal(list.tail().previous.previous, null);
    });

    it("should support removing head element during reversed iteration", () => {
      var list = new LinkedList(["foo", "bar", "baz"]);
      var iterator = list.iterator(true);

      Assert.equal("baz", iterator.next().value);
      iterator.remove();
      Assert.equal("bar", iterator.next().value);
      Assert.equal("foo", iterator.next().value);
      Assert.equal(null, iterator.next().value);

      Assert.equal(2, list.length());
      Assert.equal(list.head().node, "foo");
      Assert.equal(list.head().next.node, "bar");
      Assert.equal(list.head().next.next, null);
      Assert.equal(list.tail().node, "bar");
      Assert.equal(list.tail().previous.node, "foo");
      Assert.equal(list.tail().previous.previous, null);
    });

    it("should support removing non-edge elements during reversed iteration", () => {
      var list = new LinkedList(["foo", "bar", "baz"]);
      var iterator = list.iterator(true);

      Assert.equal("baz", iterator.next().value);
      Assert.equal("bar", iterator.next().value);
      iterator.remove();
      Assert.equal("foo", iterator.next().value);
      Assert.equal(null, iterator.next().value);

      Assert.equal(2, list.length());
      Assert.equal(list.head().node, "foo");
      Assert.equal(list.head().next.node, "baz");
      Assert.equal(list.head().next.next, null);
      Assert.equal(list.tail().node, "baz");
      Assert.equal(list.tail().previous.node, "foo");
      Assert.equal(list.tail().previous.previous, null);
    });

    it("should support removing tail element during reversed iteration", () => {
      var list = new LinkedList(["foo", "bar", "baz"]);
      var iterator = list.iterator(true);

      Assert.equal("baz", iterator.next().value);
      Assert.equal("bar", iterator.next().value);
      Assert.equal("foo", iterator.next().value);
      iterator.remove();
      Assert.equal(null, iterator.next().value);

      Assert.equal(2, list.length());
      Assert.equal(list.head().node, "bar");
      Assert.equal(list.head().next.node, "baz");
      Assert.equal(list.head().next.next, null);
      Assert.equal(list.tail().node, "baz");
      Assert.equal(list.tail().previous.node, "bar");
      Assert.equal(list.tail().previous.previous, null);
    });
  });
});
