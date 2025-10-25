import capitalize from "../core/strings/capitalize";

describe("capitalize", () => {
  describe("basic capitalization", () => {
    it("should capitalize the first letter of lowercase strings", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("world")).toBe("World");
      expect(capitalize("test")).toBe("Test");
    });

    it("should handle already capitalized strings", () => {
      expect(capitalize("Hello")).toBe("Hello");
      expect(capitalize("World")).toBe("World");
    });

    it("should handle all uppercase strings", () => {
      expect(capitalize("HELLO")).toBe("HELLO");
      expect(capitalize("WORLD")).toBe("WORLD");
    });

    it("should handle mixed case strings", () => {
      expect(capitalize("hELLO")).toBe("HELLO");
      expect(capitalize("wORLD")).toBe("WORLD");
    });
  });

  describe("empty and whitespace strings", () => {
    it("should return empty string for empty input", () => {
      expect(capitalize("")).toBe("");
    });

    it("should handle strings starting with whitespace", () => {
      expect(capitalize(" hello")).toBe(" hello");
      expect(capitalize("  world")).toBe("  world");
    });

    it("should handle strings with only whitespace", () => {
      expect(capitalize("   ")).toBe("   ");
      expect(capitalize("\t")).toBe("\t");
      expect(capitalize("\n")).toBe("\n");
    });
  });

  describe("special characters", () => {
    it("should handle strings starting with numbers", () => {
      expect(capitalize("123test")).toBe("123test");
      expect(capitalize("1hello")).toBe("1hello");
    });

    it("should handle strings starting with special characters", () => {
      expect(capitalize("@hello")).toBe("@hello");
      expect(capitalize("#world")).toBe("#world");
      expect(capitalize("$test")).toBe("$test");
      expect(capitalize("!important")).toBe("!important");
    });

    it("should handle strings with punctuation", () => {
      expect(capitalize("hello.world")).toBe("Hello.world");
      expect(capitalize("test,case")).toBe("Test,case");
    });
  });

  describe("multi-word strings", () => {
    it("should only capitalize the first letter", () => {
      expect(capitalize("hello world")).toBe("Hello world");
      expect(capitalize("the quick brown fox")).toBe("The quick brown fox");
    });

    it("should not affect other words", () => {
      expect(capitalize("hello World")).toBe("Hello World");
      expect(capitalize("the Quick Brown Fox")).toBe("The Quick Brown Fox");
    });
  });

  describe("unicode and special characters", () => {
    it("should handle unicode characters", () => {
      expect(capitalize("héllo")).toBe("Héllo");
      expect(capitalize("über")).toBe("Über");
      expect(capitalize("naïve")).toBe("Naïve");
    });

    it("should handle emoji", () => {
      expect(capitalize("😀hello")).toBe("😀hello");
      expect(capitalize("🌍world")).toBe("🌍world");
    });

    it("should handle non-Latin scripts", () => {
      expect(capitalize("你好")).toBe("你好");
      expect(capitalize("مرحبا")).toBe("مرحبا");
      expect(capitalize("こんにちは")).toBe("こんにちは");
    });
  });

  describe("single character strings", () => {
    it("should capitalize single lowercase letters", () => {
      expect(capitalize("a")).toBe("A");
      expect(capitalize("z")).toBe("Z");
    });

    it("should handle single uppercase letters", () => {
      expect(capitalize("A")).toBe("A");
      expect(capitalize("Z")).toBe("Z");
    });

    it("should handle single special characters", () => {
      expect(capitalize("@")).toBe("@");
      expect(capitalize("1")).toBe("1");
    });
  });

  describe("error handling", () => {
    it("should return original value for non-string inputs", () => {
      expect(capitalize(null as any)).toBe(null);
      expect(capitalize(undefined as any)).toBe(undefined);
      expect(capitalize(123 as any)).toBe(123);
      expect(capitalize({} as any)).toEqual({});
    });
  });
});
