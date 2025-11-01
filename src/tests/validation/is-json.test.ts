import isJson from "../../core/validation/is-json";

describe("isJson", () => {
  describe("valid JSON strings", () => {
    it("should return true for valid JSON objects", () => {
      expect(isJson('{"name": "test"}')).toBe(true);
      expect(isJson('{"a":1,"b":2}')).toBe(true);
      expect(isJson('{"nested":{"key":"value"}}')).toBe(true);
    });

    it("should return true for valid JSON arrays", () => {
      expect(isJson("[1, 2, 3]")).toBe(true);
      expect(isJson('["a","b","c"]')).toBe(true);
      expect(isJson("[]")).toBe(true);
    });

    it("should return true for JSON primitives", () => {
      expect(isJson('"string"')).toBe(true);
      expect(isJson("123")).toBe(true);
      expect(isJson("123.456")).toBe(true);
      expect(isJson("true")).toBe(true);
      expect(isJson("false")).toBe(true);
      expect(isJson("null")).toBe(true);
    });

    it("should return true for complex nested JSON", () => {
      expect(
        isJson('{"users":[{"id":1,"name":"John"},{"id":2,"name":"Jane"}]}'),
      ).toBe(true);
      expect(isJson('{"data":{"items":[1,2,3],"total":3}}')).toBe(true);
    });
  });

  describe("invalid JSON strings", () => {
    it("should return false for JSON with trailing commas", () => {
      expect(isJson('{"name": "test",}')).toBe(false);
      expect(isJson("[1, 2, 3,]")).toBe(false);
    });

    it("should return false for invalid syntax", () => {
      expect(isJson("invalid")).toBe(false);
      expect(isJson("{name: 'test'}")).toBe(false);
      expect(isJson("{'name': 'test'}")).toBe(false);
      expect(isJson("{name: test}")).toBe(false);
    });

    it("should return false for empty strings", () => {
      expect(isJson("")).toBe(false);
      expect(isJson("   ")).toBe(false);
    });

    it("should return false for incomplete JSON", () => {
      expect(isJson("{")).toBe(false);
      expect(isJson("}")).toBe(false);
      expect(isJson("[")).toBe(false);
      expect(isJson("]")).toBe(false);
      expect(isJson('{"name":')).toBe(false);
    });

    it("should return false for unquoted strings", () => {
      expect(isJson("hello")).toBe(false);
      expect(isJson("test123")).toBe(false);
    });
  });

  describe("non-string values", () => {
    it("should return false for numbers", () => {
      expect(isJson(123 as any)).toBe(false);
      expect(isJson(0 as any)).toBe(false);
      expect(isJson(-1 as any)).toBe(false);
      expect(isJson(3.14 as any)).toBe(false);
    });

    it("should return false for objects", () => {
      expect(isJson({} as any)).toBe(false);
      expect(isJson({ name: "test" } as any)).toBe(false);
      expect(isJson(new Object() as any)).toBe(false);
    });

    it("should return false for arrays", () => {
      expect(isJson([] as any)).toBe(false);
      expect(isJson([1, 2, 3] as any)).toBe(false);
    });

    it("should return false for null and undefined", () => {
      expect(isJson(null as any)).toBe(false);
      expect(isJson(undefined as any)).toBe(false);
    });

    it("should return false for booleans", () => {
      expect(isJson(true as any)).toBe(false);
      expect(isJson(false as any)).toBe(false);
    });

    it("should return false for functions", () => {
      expect(isJson((() => {}) as any)).toBe(false);
      expect(isJson(function () {} as any)).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle JSON with special characters", () => {
      expect(isJson('{"text":"hello\\nworld"}')).toBe(true);
      expect(isJson('{"quote":"He said \\"hello\\""}')).toBe(true);
    });

    it("should handle JSON with unicode", () => {
      expect(isJson('{"emoji":"😀"}')).toBe(true);
      expect(isJson('{"chinese":"你好"}')).toBe(true);
    });

    it("should handle very large numbers", () => {
      expect(isJson("999999999999999999")).toBe(true);
      expect(isJson("1.7976931348623157e+308")).toBe(true);
    });
  });
});
