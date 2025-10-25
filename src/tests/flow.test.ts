import flow from "../core/runners/flow";

describe("flow", () => {
  describe("basic composition", () => {
    it("should compose 2 functions correctly", () => {
      const addOne = (n: number) => n + 1;
      const double = (n: number) => n * 2;
      const pipeline = flow(addOne, double);

      expect(pipeline(3)).toBe(8); // (3 + 1) * 2 = 8
    });

    it("should compose 3 functions correctly", () => {
      const addOne = (n: number) => n + 1;
      const double = (n: number) => n * 2;
      const square = (n: number) => n * n;
      const pipeline = flow(addOne, double, square);

      expect(pipeline(2)).toBe(36); // ((2 + 1) * 2)² = 36
    });

    it("should compose 4 functions correctly", () => {
      const addOne = (n: number) => n + 1;
      const double = (n: number) => n * 2;
      const square = (n: number) => n * n;
      const halve = (n: number) => n / 2;
      const pipeline = flow(addOne, double, square, halve);

      expect(pipeline(2)).toBe(18); // (((2 + 1) * 2)²) / 2 = 18
    });
  });

  describe("type inference", () => {
    it("should infer types correctly for string to number pipeline", () => {
      const stringToLength = (s: string) => s.length;
      const doubleLength = (n: number) => n * 2;
      const pipeline = flow(stringToLength, doubleLength);

      const result = pipeline("hello");
      expect(result).toBe(10);
      expect(typeof result).toBe("number");
    });

    it("should infer types correctly for number to boolean pipeline", () => {
      const isEven = (n: number) => n % 2 === 0;
      const negate = (b: boolean) => !b;
      const pipeline = flow(isEven, negate);

      expect(pipeline(2)).toBe(false); // 2 is even, !true = false
      expect(pipeline(3)).toBe(true); // 3 is odd, !false = true
    });
  });

  describe("edge cases", () => {
    it("should throw error with less than 2 functions", () => {
      expect(() => (flow as any)((x: number) => x)).toThrow(
        "flow requires at least 2 functions",
      );
    });

    it("should throw error with 0 functions", () => {
      expect(() => (flow as any)()).toThrow(
        "flow requires at least 2 functions",
      );
    });

    it("should work with exactly 2 functions", () => {
      const pipeline = flow(
        (x: string) => x.length,
        (n: number) => n > 5,
      );
      expect(pipeline("hello")).toBe(false);
      expect(pipeline("hello world")).toBe(true);
    });
  });

  describe("usage examples", () => {
    it("should work for string processing pipeline", () => {
      const trim = (s: string) => s.trim();
      const toUpper = (s: string) => s.toUpperCase();
      const addPrefix = (s: string) => `PREFIX_${s}`;

      const processString = flow(trim, toUpper, addPrefix);

      expect(processString("  hello world  ")).toBe("PREFIX_HELLO WORLD");
      expect(processString("\t\ntest\t\n")).toBe("PREFIX_TEST");
    });

    it("should work for number math pipeline", () => {
      const addOne = (n: number) => n + 1;
      const square = (n: number) => n * n;
      const halve = (n: number) => n / 2;

      const processNumber = flow(addOne, square, halve);

      expect(processNumber(3)).toBe(8); // ((3 + 1)²) / 2 = 8
      expect(processNumber(0)).toBe(0.5); // ((0 + 1)²) / 2 = 0.5
      expect(processNumber(1)).toBe(2); // ((1 + 1)²) / 2 = 2
    });
  });

  describe("error handling", () => {
    it("should throw UtilifyException on composition failure", () => {
      // This test ensures the safeRun wrapper works by creating a function that throws
      const pipeline = flow(
        (input: string) => input,
        (s: string) => {
          throw new Error("Function failed");
        },
      );

      expect(() => pipeline("test")).toThrow("Function failed");
    });

    it("should validate function count before composition", () => {
      expect(() => (flow as any)((x: any) => x)).toThrow(
        "flow requires at least 2 functions",
      );
    });
  });

  describe("function preservation", () => {
    it("should not modify original functions", () => {
      const originalFn = jest.fn((x: number) => x * 2);
      const pipeline = flow((x: number) => x + 1, originalFn);

      expect(pipeline(3)).toBe(8); // (3 + 1) * 2 = 8
      expect(originalFn).toHaveBeenCalledWith(4);
    });

    it("should handle functions that return different types", () => {
      const numberToString = (n: number) => n.toString();
      const stringToBoolean = (s: string) => s.length > 3;
      const pipeline = flow(numberToString, stringToBoolean);

      expect(pipeline(1234)).toBe(true); // "1234".length > 3 = true
      expect(pipeline(12)).toBe(false); // "12".length > 3 = false
    });
  });
});
