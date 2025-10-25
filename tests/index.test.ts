import Utilify from "../src/index";

describe("Utilify", () => {
  describe("isJson", () => {
    it("should return true for valid JSON strings", () => {
      expect(Utilify.isJson('{"name": "test"}')).toBe(true);
      expect(Utilify.isJson("[1, 2, 3]")).toBe(true);
      expect(Utilify.isJson('"string"')).toBe(true);
      expect(Utilify.isJson("123")).toBe(true);
      expect(Utilify.isJson("true")).toBe(true);
      expect(Utilify.isJson("null")).toBe(true);
    });

    it("should return false for invalid JSON strings", () => {
      expect(Utilify.isJson('{"name": "test",}')).toBe(false);
      expect(Utilify.isJson("[1, 2, 3,]")).toBe(false);
      expect(Utilify.isJson("invalid")).toBe(false);
      expect(Utilify.isJson("")).toBe(false);
    });

    it("should return false for non-string values", () => {
      expect(Utilify.isJson(123)).toBe(false);
      expect(Utilify.isJson({})).toBe(false);
      expect(Utilify.isJson([])).toBe(false);
      expect(Utilify.isJson(null)).toBe(false);
      expect(Utilify.isJson(undefined)).toBe(false);
    });
  });

  describe("isObject", () => {
    it("should return true for plain objects", () => {
      expect(Utilify.isObject({})).toBe(true);
      expect(Utilify.isObject({ name: "test" })).toBe(true);
      expect(Utilify.isObject(new Object())).toBe(true);
    });

    it("should return false for arrays", () => {
      expect(Utilify.isObject([])).toBe(false);
      expect(Utilify.isObject([1, 2, 3])).toBe(false);
    });

    it("should return false for primitives", () => {
      expect(Utilify.isObject("string")).toBe(false);
      expect(Utilify.isObject(123)).toBe(false);
      expect(Utilify.isObject(true)).toBe(false);
      expect(Utilify.isObject(null)).toBe(false);
      expect(Utilify.isObject(undefined)).toBe(false);
    });

    it("should return false for functions", () => {
      expect(Utilify.isObject(() => {})).toBe(false);
      expect(Utilify.isObject(function () {})).toBe(false);
    });

    it("should return true for built-in objects", () => {
      expect(Utilify.isObject(new Date())).toBe(true);
      expect(Utilify.isObject(new RegExp("test"))).toBe(true);
    });
  });

  describe("isEmpty", () => {
    it("should return true for empty values", () => {
      expect(Utilify.isEmpty(null)).toBe(true);
      expect(Utilify.isEmpty(undefined)).toBe(true);
      expect(Utilify.isEmpty("")).toBe(true);
      expect(Utilify.isEmpty([])).toBe(true);
      expect(Utilify.isEmpty({})).toBe(true);
    });

    it("should return false for non-empty values", () => {
      expect(Utilify.isEmpty("string")).toBe(false);
      expect(Utilify.isEmpty(123)).toBe(false);
      expect(Utilify.isEmpty(true)).toBe(false);
      expect(Utilify.isEmpty([1, 2, 3])).toBe(false);
      expect(Utilify.isEmpty({ name: "test" })).toBe(false);
    });

    it("should return false for zero and false", () => {
      expect(Utilify.isEmpty(0)).toBe(false);
      expect(Utilify.isEmpty(false)).toBe(false);
    });
  });
});
