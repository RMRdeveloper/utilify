import isObject from "../core/validation/is-object";

describe("isObject", () => {
  describe("plain objects", () => {
    it("should return true for empty objects", () => {
      expect(isObject({})).toBe(true);
    });

    it("should return true for objects with properties", () => {
      expect(isObject({ name: "test" })).toBe(true);
      expect(isObject({ a: 1, b: 2, c: 3 })).toBe(true);
    });

    it("should return true for nested objects", () => {
      expect(isObject({ nested: { key: "value" } })).toBe(true);
      expect(isObject({ a: { b: { c: "deep" } } })).toBe(true);
    });

    it("should return true for objects created with Object constructor", () => {
      expect(isObject(new Object())).toBe(true);
      expect(isObject(Object.create(null))).toBe(true);
      expect(isObject(Object.create({}))).toBe(true);
    });
  });

  describe("built-in objects", () => {
    it("should return true for Date objects", () => {
      expect(isObject(new Date())).toBe(true);
      expect(isObject(new Date("2024-01-01"))).toBe(true);
    });

    it("should return true for RegExp objects", () => {
      expect(isObject(new RegExp("test"))).toBe(true);
      expect(isObject(/test/)).toBe(true);
    });

    it("should return true for Error objects", () => {
      expect(isObject(new Error())).toBe(true);
      expect(isObject(new TypeError())).toBe(true);
    });

    it("should return true for Map and Set", () => {
      expect(isObject(new Map())).toBe(true);
      expect(isObject(new Set())).toBe(true);
      expect(isObject(new WeakMap())).toBe(true);
      expect(isObject(new WeakSet())).toBe(true);
    });
  });

  describe("arrays", () => {
    it("should return false for empty arrays", () => {
      expect(isObject([])).toBe(false);
    });

    it("should return false for arrays with elements", () => {
      expect(isObject([1, 2, 3])).toBe(false);
      expect(isObject(["a", "b", "c"])).toBe(false);
    });

    it("should return false for nested arrays", () => {
      expect(
        isObject([
          [1, 2],
          [3, 4],
        ]),
      ).toBe(false);
    });

    it("should return false for Array constructor", () => {
      expect(isObject(new Array())).toBe(false);
      expect(isObject(Array(5))).toBe(false);
    });
  });

  describe("primitives", () => {
    it("should return false for strings", () => {
      expect(isObject("string")).toBe(false);
      expect(isObject("")).toBe(false);
      expect(isObject("hello world")).toBe(false);
    });

    it("should return false for numbers", () => {
      expect(isObject(123)).toBe(false);
      expect(isObject(0)).toBe(false);
      expect(isObject(-1)).toBe(false);
      expect(isObject(3.14)).toBe(false);
      expect(isObject(NaN)).toBe(false);
      expect(isObject(Infinity)).toBe(false);
    });

    it("should return false for booleans", () => {
      expect(isObject(true)).toBe(false);
      expect(isObject(false)).toBe(false);
    });

    it("should return false for null and undefined", () => {
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
    });

    it("should return false for symbols", () => {
      expect(isObject(Symbol())).toBe(false);
      expect(isObject(Symbol("test"))).toBe(false);
    });
  });

  describe("functions", () => {
    it("should return false for arrow functions", () => {
      expect(isObject(() => {})).toBe(false);
      expect(isObject((x: number) => x * 2)).toBe(false);
    });

    it("should return false for regular functions", () => {
      expect(isObject(function () {})).toBe(false);
      expect(isObject(function named() {})).toBe(false);
    });

    it("should return false for async functions", () => {
      expect(isObject(async () => {})).toBe(false);
      expect(isObject(async function () {})).toBe(false);
    });

    it("should return false for class constructors", () => {
      class TestClass {}
      expect(isObject(TestClass)).toBe(false);
    });

    it("should return true for class instances", () => {
      class TestClass {}
      expect(isObject(new TestClass())).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle objects with null prototype", () => {
      const obj = Object.create(null);
      obj.key = "value";
      expect(isObject(obj)).toBe(true);
    });

    it("should handle frozen objects", () => {
      const obj = Object.freeze({ a: 1 });
      expect(isObject(obj)).toBe(true);
    });

    it("should handle sealed objects", () => {
      const obj = Object.seal({ a: 1 });
      expect(isObject(obj)).toBe(true);
    });

    it("should handle objects with getters/setters", () => {
      const obj = {
        _value: 0,
        get value() {
          return this._value;
        },
        set value(v) {
          this._value = v;
        },
      };
      expect(isObject(obj)).toBe(true);
    });
  });
});
