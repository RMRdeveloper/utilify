"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
describe("Utilify", () => {
  describe("isJson", () => {
    it("should return true for valid JSON strings", () => {
      expect(index_1.default.isJson('{"name": "test"}')).toBe(true);
      expect(index_1.default.isJson("[1, 2, 3]")).toBe(true);
      expect(index_1.default.isJson('"string"')).toBe(true);
      expect(index_1.default.isJson("123")).toBe(true);
      expect(index_1.default.isJson("true")).toBe(true);
      expect(index_1.default.isJson("null")).toBe(true);
    });
    it("should return false for invalid JSON strings", () => {
      expect(index_1.default.isJson('{"name": "test",}')).toBe(false);
      expect(index_1.default.isJson("[1, 2, 3,]")).toBe(false);
      expect(index_1.default.isJson("invalid")).toBe(false);
      expect(index_1.default.isJson("")).toBe(false);
    });
    it("should return false for non-string values", () => {
      expect(index_1.default.isJson(123)).toBe(false);
      expect(index_1.default.isJson({})).toBe(false);
      expect(index_1.default.isJson([])).toBe(false);
      expect(index_1.default.isJson(null)).toBe(false);
      expect(index_1.default.isJson(undefined)).toBe(false);
    });
  });
  describe("isObject", () => {
    it("should return true for plain objects", () => {
      expect(index_1.default.isObject({})).toBe(true);
      expect(index_1.default.isObject({ name: "test" })).toBe(true);
      expect(index_1.default.isObject(new Object())).toBe(true);
    });
    it("should return false for arrays", () => {
      expect(index_1.default.isObject([])).toBe(false);
      expect(index_1.default.isObject([1, 2, 3])).toBe(false);
    });
    it("should return false for primitives", () => {
      expect(index_1.default.isObject("string")).toBe(false);
      expect(index_1.default.isObject(123)).toBe(false);
      expect(index_1.default.isObject(true)).toBe(false);
      expect(index_1.default.isObject(null)).toBe(false);
      expect(index_1.default.isObject(undefined)).toBe(false);
    });
    it("should return false for functions", () => {
      expect(index_1.default.isObject(() => {})).toBe(false);
      expect(index_1.default.isObject(function () {})).toBe(false);
    });
    it("should return true for built-in objects", () => {
      expect(index_1.default.isObject(new Date())).toBe(true);
      expect(index_1.default.isObject(new RegExp("test"))).toBe(true);
    });
  });
  describe("isEmpty", () => {
    it("should return true for empty values", () => {
      expect(index_1.default.isEmpty(null)).toBe(true);
      expect(index_1.default.isEmpty(undefined)).toBe(true);
      expect(index_1.default.isEmpty("")).toBe(true);
      expect(index_1.default.isEmpty([])).toBe(true);
      expect(index_1.default.isEmpty({})).toBe(true);
    });
    it("should return false for non-empty values", () => {
      expect(index_1.default.isEmpty("string")).toBe(false);
      expect(index_1.default.isEmpty(123)).toBe(false);
      expect(index_1.default.isEmpty(true)).toBe(false);
      expect(index_1.default.isEmpty([1, 2, 3])).toBe(false);
      expect(index_1.default.isEmpty({ name: "test" })).toBe(false);
    });
    it("should return false for zero and false", () => {
      expect(index_1.default.isEmpty(0)).toBe(false);
      expect(index_1.default.isEmpty(false)).toBe(false);
    });
  });
  describe("capitalize", () => {
    it("should capitalize the first letter of a string", () => {
      expect(index_1.default.capitalize("hello")).toBe("Hello");
      expect(index_1.default.capitalize("world")).toBe("World");
      expect(index_1.default.capitalize("")).toBe("");
    });
    it("should return the original string if it is empty", () => {
      expect(index_1.default.capitalize("")).toBe("");
    });
  });
});
//# sourceMappingURL=index.test.js.map
