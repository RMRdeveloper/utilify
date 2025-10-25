import toKebabCase from "../core/strings/to-kebab-case";

describe("toKebabCase", () => {
  describe("camelCase conversion", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(toKebabCase("camelCase")).toBe("camel-case");
      expect(toKebabCase("helloWorld")).toBe("hello-world");
      expect(toKebabCase("myVariableName")).toBe("my-variable-name");
    });

    it("should handle single word camelCase", () => {
      expect(toKebabCase("hello")).toBe("hello");
      expect(toKebabCase("test")).toBe("test");
    });

    it("should handle multiple capital letters", () => {
      expect(toKebabCase("XMLHttpRequest")).toBe("xmlhttp-request");
      expect(toKebabCase("getHTMLElement")).toBe("get-htmlelement");
    });
  });

  describe("PascalCase conversion", () => {
    it("should convert PascalCase to kebab-case", () => {
      expect(toKebabCase("PascalCase")).toBe("pascal-case");
      expect(toKebabCase("HelloWorld")).toBe("hello-world");
      expect(toKebabCase("MyClassName")).toBe("my-class-name");
    });

    it("should handle single word PascalCase", () => {
      expect(toKebabCase("Hello")).toBe("hello");
      expect(toKebabCase("Test")).toBe("test");
    });
  });

  describe("spaces and underscores", () => {
    it("should convert spaces to hyphens", () => {
      expect(toKebabCase("hello world")).toBe("hello-world");
      expect(toKebabCase("the quick brown fox")).toBe("the-quick-brown-fox");
    });

    it("should convert underscores to hyphens", () => {
      expect(toKebabCase("hello_world")).toBe("hello-world");
      expect(toKebabCase("snake_case_string")).toBe("snake-case-string");
    });

    it("should handle mixed spaces and underscores", () => {
      expect(toKebabCase("hello_world test")).toBe("hello-world-test");
      expect(toKebabCase("my_var name")).toBe("my-var-name");
    });

    it("should handle multiple consecutive spaces", () => {
      expect(toKebabCase("hello  world")).toBe("hello-world");
      expect(toKebabCase("test   case")).toBe("test-case");
    });

    it("should handle multiple consecutive underscores", () => {
      expect(toKebabCase("hello__world")).toBe("hello-world");
      expect(toKebabCase("test___case")).toBe("test-case");
    });
  });

  describe("already kebab-case", () => {
    it("should handle already kebab-case strings", () => {
      expect(toKebabCase("already-kebab-case")).toBe("already-kebab-case");
      expect(toKebabCase("kebab-case-string")).toBe("kebab-case-string");
    });

    it("should handle single word kebab-case", () => {
      expect(toKebabCase("hello")).toBe("hello");
      expect(toKebabCase("test")).toBe("test");
    });
  });

  describe("case conversion", () => {
    it("should convert to lowercase", () => {
      expect(toKebabCase("HELLO_WORLD")).toBe("hello-world");
      expect(toKebabCase("SCREAMING_SNAKE_CASE")).toBe("screaming-snake-case");
    });

    it("should handle mixed case", () => {
      expect(toKebabCase("HeLLo WoRLd")).toBe("he-llo-wo-rld");
      expect(toKebabCase("MiXeD_CaSe")).toBe("mi-xe-d-ca-se");
    });
  });

  describe("empty and whitespace", () => {
    it("should handle empty strings", () => {
      expect(toKebabCase("")).toBe("");
    });

    it("should handle strings with only spaces", () => {
      expect(toKebabCase("   ")).toBe("-");
    });

    it("should handle strings with only underscores", () => {
      expect(toKebabCase("___")).toBe("-");
    });
  });

  describe("special characters", () => {
    it("should handle numbers", () => {
      expect(toKebabCase("test123")).toBe("test123");
      expect(toKebabCase("version2Point0")).toBe("version2point0");
    });

    it("should handle hyphens in input", () => {
      expect(toKebabCase("already-has-hyphens")).toBe("already-has-hyphens");
      expect(toKebabCase("mixed-With_Separators")).toBe(
        "mixed-with-separators",
      );
    });

    it("should preserve numbers between words", () => {
      expect(toKebabCase("test123Case")).toBe("test123case");
      expect(toKebabCase("version2Update")).toBe("version2update");
    });
  });

  describe("edge cases", () => {
    it("should handle single characters", () => {
      expect(toKebabCase("a")).toBe("a");
      expect(toKebabCase("A")).toBe("a");
    });

    it("should handle strings with leading/trailing spaces", () => {
      expect(toKebabCase("  hello world  ")).toBe("-hello-world-");
      expect(toKebabCase("  test  ")).toBe("-test-");
    });

    it("should handle strings with leading/trailing underscores", () => {
      expect(toKebabCase("__hello_world__")).toBe("-hello-world-");
      expect(toKebabCase("_test_")).toBe("-test-");
    });

    it("should handle acronyms", () => {
      expect(toKebabCase("HTTPSConnection")).toBe("httpsconnection");
      expect(toKebabCase("URLParser")).toBe("urlparser");
    });
  });

  describe("error handling", () => {
    it("should return empty string for non-string inputs", () => {
      expect(toKebabCase(null as any)).toBe("");
      expect(toKebabCase(undefined as any)).toBe("");
      expect(toKebabCase(123 as any)).toBe("");
      expect(toKebabCase({} as any)).toBe("");
    });
  });
});
