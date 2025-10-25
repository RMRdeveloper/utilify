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
    it("should handle strings that are already capitalized", () => {
      expect(index_1.default.capitalize("Hello")).toBe("Hello");
      expect(index_1.default.capitalize("WORLD")).toBe("WORLD");
    });
    it("should handle strings with numbers and special characters", () => {
      expect(index_1.default.capitalize("123test")).toBe("123test");
      expect(index_1.default.capitalize("@hello")).toBe("@hello");
    });
  });
  describe("toKebabCase", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(index_1.default.toKebabCase("camelCase")).toBe("camel-case");
      expect(index_1.default.toKebabCase("helloWorld")).toBe("hello-world");
    });
    it("should convert PascalCase to kebab-case", () => {
      expect(index_1.default.toKebabCase("PascalCase")).toBe("pascal-case");
      expect(index_1.default.toKebabCase("HelloWorld")).toBe("hello-world");
    });
    it("should convert spaces and underscores to hyphens", () => {
      expect(index_1.default.toKebabCase("hello world")).toBe("hello-world");
      expect(index_1.default.toKebabCase("hello_world")).toBe("hello-world");
      expect(index_1.default.toKebabCase("hello_world test")).toBe(
        "hello-world-test",
      );
    });
    it("should handle already kebab-case strings", () => {
      expect(index_1.default.toKebabCase("already-kebab-case")).toBe(
        "already-kebab-case",
      );
      expect(index_1.default.toKebabCase("kebab-case-string")).toBe(
        "kebab-case-string",
      );
    });
    it("should convert to lowercase", () => {
      expect(index_1.default.toKebabCase("HELLO_WORLD")).toBe("hello-world");
      expect(index_1.default.toKebabCase("CamelCase")).toBe("camel-case");
    });
    it("should handle empty strings", () => {
      expect(index_1.default.toKebabCase("")).toBe("");
    });
  });
  describe("toSnakeCase", () => {
    it("should convert camelCase to snake_case", () => {
      expect(index_1.default.toSnakeCase("camelCase")).toBe("camel_case");
      expect(index_1.default.toSnakeCase("helloWorld")).toBe("hello_world");
    });
    it("should convert PascalCase to snake_case", () => {
      expect(index_1.default.toSnakeCase("PascalCase")).toBe("pascal_case");
      expect(index_1.default.toSnakeCase("HelloWorld")).toBe("hello_world");
    });
    it("should convert spaces and hyphens to underscores", () => {
      expect(index_1.default.toSnakeCase("hello world")).toBe("hello_world");
      expect(index_1.default.toSnakeCase("hello-world")).toBe("hello_world");
      expect(index_1.default.toSnakeCase("hello-world test")).toBe(
        "hello_world_test",
      );
    });
    it("should handle already snake_case strings", () => {
      expect(index_1.default.toSnakeCase("already_snake_case")).toBe(
        "already_snake_case",
      );
      expect(index_1.default.toSnakeCase("snake_case_string")).toBe(
        "snake_case_string",
      );
    });
    it("should convert to lowercase", () => {
      expect(index_1.default.toSnakeCase("HELLO_WORLD")).toBe("hello_world");
      expect(index_1.default.toSnakeCase("CamelCase")).toBe("camel_case");
    });
    it("should handle empty strings", () => {
      expect(index_1.default.toSnakeCase("")).toBe("");
    });
  });
  describe("debounce", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });
    it("should debounce a function call", () => {
      const mockFn = jest.fn();
      const debouncedFn = index_1.default.debounce(mockFn, 100);
      debouncedFn();
      debouncedFn();
      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
    it("should use default delay of 250ms", () => {
      const mockFn = jest.fn();
      const debouncedFn = index_1.default.debounce(mockFn);
      debouncedFn();
      jest.advanceTimersByTime(249);
      expect(mockFn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
    it("should reset the timer on subsequent calls", () => {
      const mockFn = jest.fn();
      const debouncedFn = index_1.default.debounce(mockFn, 100);
      debouncedFn();
      jest.advanceTimersByTime(50);
      debouncedFn();
      jest.advanceTimersByTime(50);
      debouncedFn();
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
//# sourceMappingURL=index.test.js.map
