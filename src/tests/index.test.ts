import Utilify from "../index";

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

  describe("capitalize", () => {
    it("should capitalize the first letter of a string", () => {
      expect(Utilify.capitalize("hello")).toBe("Hello");
      expect(Utilify.capitalize("world")).toBe("World");
      expect(Utilify.capitalize("")).toBe("");
    });

    it("should return the original string if it is empty", () => {
      expect(Utilify.capitalize("")).toBe("");
    });

    it("should handle strings that are already capitalized", () => {
      expect(Utilify.capitalize("Hello")).toBe("Hello");
      expect(Utilify.capitalize("WORLD")).toBe("WORLD");
    });

    it("should handle strings with numbers and special characters", () => {
      expect(Utilify.capitalize("123test")).toBe("123test");
      expect(Utilify.capitalize("@hello")).toBe("@hello");
    });
  });

  describe("toKebabCase", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(Utilify.toKebabCase("camelCase")).toBe("camel-case");
      expect(Utilify.toKebabCase("helloWorld")).toBe("hello-world");
    });

    it("should convert PascalCase to kebab-case", () => {
      expect(Utilify.toKebabCase("PascalCase")).toBe("pascal-case");
      expect(Utilify.toKebabCase("HelloWorld")).toBe("hello-world");
    });

    it("should convert spaces and underscores to hyphens", () => {
      expect(Utilify.toKebabCase("hello world")).toBe("hello-world");
      expect(Utilify.toKebabCase("hello_world")).toBe("hello-world");
      expect(Utilify.toKebabCase("hello_world test")).toBe("hello-world-test");
    });

    it("should handle already kebab-case strings", () => {
      expect(Utilify.toKebabCase("already-kebab-case")).toBe(
        "already-kebab-case",
      );
      expect(Utilify.toKebabCase("kebab-case-string")).toBe(
        "kebab-case-string",
      );
    });

    it("should convert to lowercase", () => {
      expect(Utilify.toKebabCase("HELLO_WORLD")).toBe("hello-world");
      expect(Utilify.toKebabCase("CamelCase")).toBe("camel-case");
    });

    it("should handle empty strings", () => {
      expect(Utilify.toKebabCase("")).toBe("");
    });
  });

  describe("toSnakeCase", () => {
    it("should convert camelCase to snake_case", () => {
      expect(Utilify.toSnakeCase("camelCase")).toBe("camel_case");
      expect(Utilify.toSnakeCase("helloWorld")).toBe("hello_world");
    });

    it("should convert PascalCase to snake_case", () => {
      expect(Utilify.toSnakeCase("PascalCase")).toBe("pascal_case");
      expect(Utilify.toSnakeCase("HelloWorld")).toBe("hello_world");
    });

    it("should convert spaces and hyphens to underscores", () => {
      expect(Utilify.toSnakeCase("hello world")).toBe("hello_world");
      expect(Utilify.toSnakeCase("hello-world")).toBe("hello_world");
      expect(Utilify.toSnakeCase("hello-world test")).toBe("hello_world_test");
    });

    it("should handle already snake_case strings", () => {
      expect(Utilify.toSnakeCase("already_snake_case")).toBe(
        "already_snake_case",
      );
      expect(Utilify.toSnakeCase("snake_case_string")).toBe(
        "snake_case_string",
      );
    });

    it("should convert to lowercase", () => {
      expect(Utilify.toSnakeCase("HELLO_WORLD")).toBe("hello_world");
      expect(Utilify.toSnakeCase("CamelCase")).toBe("camel_case");
    });

    it("should handle empty strings", () => {
      expect(Utilify.toSnakeCase("")).toBe("");
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
      const debouncedFn = Utilify.debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should use default delay of 250ms", () => {
      const mockFn = jest.fn();
      const debouncedFn = Utilify.debounce(mockFn);

      debouncedFn();

      jest.advanceTimersByTime(249);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should reset the timer on subsequent calls", () => {
      const mockFn = jest.fn();
      const debouncedFn = Utilify.debounce(mockFn, 100);

      debouncedFn();
      jest.advanceTimersByTime(50);

      debouncedFn();
      jest.advanceTimersByTime(50);

      debouncedFn();
      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("flow", () => {
    it("should compose functions from left to right", () => {
      const addOne = (n: number) => n + 1;
      const double = (n: number) => n * 2;
      const pipeline = Utilify.flow(addOne, double);

      expect(pipeline(3)).toBe(8); // (3 + 1) * 2 = 8
    });

    it("should work with multiple functions", () => {
      const trim = (s: string) => s.trim();
      const toUpper = (s: string) => s.toUpperCase();
      const addPrefix = (s: string) => `PREFIX_${s}`;

      const processString = Utilify.flow(trim, toUpper, addPrefix);

      expect(processString("  hello  ")).toBe("PREFIX_HELLO");
    });

    it("should throw error with less than 2 functions", () => {
      expect(() => (Utilify.flow as any)((x: number) => x)).toThrow(
        "flow requires at least 2 functions",
      );
    });
  });
});
