import trim from "../../core/strings/trim";

describe("trim", () => {
  describe("basic trimming", () => {
    it("should remove leading whitespace", () => {
      expect(trim("  hello")).toBe("hello");
      expect(trim("   world")).toBe("world");
    });

    it("should remove trailing whitespace", () => {
      expect(trim("hello  ")).toBe("hello");
      expect(trim("world   ")).toBe("world");
    });

    it("should remove both leading and trailing whitespace", () => {
      expect(trim("  hello  ")).toBe("hello");
      expect(trim("   world   ")).toBe("world");
    });

    it("should handle strings without whitespace", () => {
      expect(trim("hello")).toBe("hello");
      expect(trim("world")).toBe("world");
    });
  });

  describe("special whitespace characters", () => {
    it("should remove tabs", () => {
      expect(trim("\thello\t")).toBe("hello");
      expect(trim("\t\tworld\t\t")).toBe("world");
    });

    it("should remove newlines", () => {
      expect(trim("\nhello\n")).toBe("hello");
      expect(trim("\n\nworld\n\n")).toBe("world");
    });

    it("should remove carriage returns", () => {
      expect(trim("\rhello\r")).toBe("hello");
      expect(trim("\r\rworld\r\r")).toBe("world");
    });

    it("should remove mixed whitespace characters", () => {
      expect(trim(" \t\nhello\n\t ")).toBe("hello");
      expect(trim("\t \r\nworld\r\n \t")).toBe("world");
    });
  });

  describe("edge cases", () => {
    it("should handle empty strings", () => {
      expect(trim("")).toBe("");
    });

    it("should handle strings with only whitespace", () => {
      expect(trim("   ")).toBe("");
      expect(trim("\t\t\t")).toBe("");
      expect(trim("\n\n\n")).toBe("");
      expect(trim(" \t\n\r ")).toBe("");
    });

    it("should preserve internal whitespace", () => {
      expect(trim("  hello world  ")).toBe("hello world");
      expect(trim("  hello  world  ")).toBe("hello  world");
      expect(trim("\thello\tworld\t")).toBe("hello\tworld");
    });

    it("should handle strings with special characters", () => {
      expect(trim("  @hello!  ")).toBe("@hello!");
      expect(trim("  #world$  ")).toBe("#world$");
    });

    it("should handle strings with numbers", () => {
      expect(trim("  123  ")).toBe("123");
      expect(trim("  456.789  ")).toBe("456.789");
    });
  });

  describe("unicode and special cases", () => {
    it("should handle unicode characters", () => {
      expect(trim("  héllo  ")).toBe("héllo");
      expect(trim("  世界  ")).toBe("世界");
      expect(trim("  🌍  ")).toBe("🌍");
    });

    it("should handle multi-line strings", () => {
      expect(trim("  hello\nworld  ")).toBe("hello\nworld");
      expect(trim("\n\nhello\nworld\n\n")).toBe("hello\nworld");
    });
  });

  describe("error handling", () => {
    it("should throw UtilifyException for non-string values", () => {
      expect(() => trim(null as any)).toThrow("Input must be a string");
      expect(() => trim(undefined as any)).toThrow("Input must be a string");
      expect(() => trim(123 as any)).toThrow("Input must be a string");
      expect(() => trim({} as any)).toThrow("Input must be a string");
    });
  });
});
