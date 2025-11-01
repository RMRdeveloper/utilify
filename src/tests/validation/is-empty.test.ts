import isEmpty from "../../core/validation/is-empty";

describe("isEmpty", () => {
  describe("empty values", () => {
    it("should return true for null", () => {
      expect(isEmpty(null)).toBe(true);
    });

    it("should return true for undefined", () => {
      expect(isEmpty(undefined)).toBe(true);
    });

    it("should return true for empty strings", () => {
      expect(isEmpty("")).toBe(true);
    });

    it("should return true for empty arrays", () => {
      expect(isEmpty([])).toBe(true);
    });

    it("should return true for empty objects", () => {
      expect(isEmpty({})).toBe(true);
    });
  });

  describe("non-empty values", () => {
    it("should return false for arrays with elements", () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty([0])).toBe(false);
      expect(isEmpty([null])).toBe(false);
      expect(isEmpty([undefined])).toBe(false);
      expect(isEmpty([[]])).toBe(false);
    });

    it("should return false for numbers", () => {
      expect(isEmpty(123)).toBe(false);
      expect(isEmpty(1)).toBe(false);
      expect(isEmpty(-1)).toBe(false);
      expect(isEmpty(3.14)).toBe(false);
    });

    it("should return false for booleans", () => {
      expect(isEmpty(true)).toBe(false);
    });

    it("should return false for non-empty arrays", () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty([0])).toBe(false);
      expect(isEmpty([null])).toBe(false);
      expect(isEmpty([undefined])).toBe(false);
      expect(isEmpty([[]])).toBe(false);
    });

    it("should return false for non-empty objects", () => {
      expect(isEmpty({ name: "test" })).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty({ key: null })).toBe(false);
      expect(isEmpty({ key: undefined })).toBe(false);
    });
  });

  describe("special cases for zero and false", () => {
    it("should return false for zero", () => {
      expect(isEmpty(0)).toBe(false);
    });

    it("should return false for false", () => {
      expect(isEmpty(false)).toBe(false);
    });

    it("should return false for negative zero", () => {
      expect(isEmpty(-0)).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle Map and Set as empty when they have no entries", () => {
      expect(isEmpty(new Map())).toBe(true);
      expect(isEmpty(new Set())).toBe(true);
    });

    it("should handle Map and Set with entries", () => {
      const map = new Map();
      map.set("key", "value");
      expect(isEmpty(map)).toBe(false);

      const set = new Set();
      set.add(1);
      expect(isEmpty(set)).toBe(false);
    });

    it("should handle objects with properties", () => {
      expect(isEmpty({ length: 0 })).toBe(false);
      expect(isEmpty({ length: 5 })).toBe(false);
      expect(isEmpty({ 0: "a", 1: "b", length: 2 })).toBe(false);
    });
  });
});
