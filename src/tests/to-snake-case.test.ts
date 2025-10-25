import toSnakeCase from "../core/strings/to-snake-case";

describe("toSnakeCase", () => {
  describe("camelCase conversion", () => {
    it("should convert camelCase to snake_case", () => {
      expect(toSnakeCase("camelCase")).toBe("camel_case");
      expect(toSnakeCase("helloWorld")).toBe("hello_world");
      expect(toSnakeCase("myVariableName")).toBe("my_variable_name");
    });

    it("should handle single word camelCase", () => {
      expect(toSnakeCase("hello")).toBe("hello");
      expect(toSnakeCase("test")).toBe("test");
    });

    it("should handle multiple capital letters", () => {
      expect(toSnakeCase("XMLHttpRequest")).toBe("xmlhttp_request");
      expect(toSnakeCase("getHTMLElement")).toBe("get_htmlelement");
    });
  });

  describe("PascalCase conversion", () => {
    it("should convert PascalCase to snake_case", () => {
      expect(toSnakeCase("PascalCase")).toBe("pascal_case");
      expect(toSnakeCase("HelloWorld")).toBe("hello_world");
      expect(toSnakeCase("MyClassName")).toBe("my_class_name");
    });

    it("should handle single word PascalCase", () => {
      expect(toSnakeCase("Hello")).toBe("hello");
      expect(toSnakeCase("Test")).toBe("test");
    });
  });

  describe("spaces and hyphens", () => {
    it("should convert spaces to underscores", () => {
      expect(toSnakeCase("hello world")).toBe("hello_world");
      expect(toSnakeCase("the quick brown fox")).toBe("the_quick_brown_fox");
    });

    it("should convert hyphens to underscores", () => {
      expect(toSnakeCase("hello-world")).toBe("hello_world");
      expect(toSnakeCase("kebab-case-string")).toBe("kebab_case_string");
    });

    it("should handle mixed spaces and hyphens", () => {
      expect(toSnakeCase("hello-world test")).toBe("hello_world_test");
      expect(toSnakeCase("my-var name")).toBe("my_var_name");
    });

    it("should handle multiple consecutive spaces", () => {
      expect(toSnakeCase("hello  world")).toBe("hello_world");
      expect(toSnakeCase("test   case")).toBe("test_case");
    });

    it("should handle multiple consecutive hyphens", () => {
      expect(toSnakeCase("hello--world")).toBe("hello_world");
      expect(toSnakeCase("test---case")).toBe("test_case");
    });
  });

  describe("already snake_case", () => {
    it("should handle already snake_case strings", () => {
      expect(toSnakeCase("already_snake_case")).toBe("already_snake_case");
      expect(toSnakeCase("snake_case_string")).toBe("snake_case_string");
    });

    it("should handle single word snake_case", () => {
      expect(toSnakeCase("hello")).toBe("hello");
      expect(toSnakeCase("test")).toBe("test");
    });
  });

  describe("case conversion", () => {
    it("should convert to lowercase", () => {
      expect(toSnakeCase("HELLO_WORLD")).toBe("hello_world");
      expect(toSnakeCase("SCREAMING_SNAKE_CASE")).toBe("screaming_snake_case");
    });

    it("should handle mixed case", () => {
      expect(toSnakeCase("HeLLo WoRLd")).toBe("he_llo_wo_rld");
      expect(toSnakeCase("MiXeD-CaSe")).toBe("mi_xe_d_ca_se");
    });
  });

  describe("empty and whitespace", () => {
    it("should handle empty strings", () => {
      expect(toSnakeCase("")).toBe("");
    });

    it("should handle strings with only spaces", () => {
      expect(toSnakeCase("   ")).toBe("_");
    });

    it("should handle strings with only hyphens", () => {
      expect(toSnakeCase("---")).toBe("_");
    });
  });

  describe("special characters", () => {
    it("should handle numbers", () => {
      expect(toSnakeCase("test123")).toBe("test123");
      expect(toSnakeCase("version2Point0")).toBe("version2point0");
    });

    it("should handle underscores in input", () => {
      expect(toSnakeCase("already_has_underscores")).toBe(
        "already_has_underscores",
      );
      expect(toSnakeCase("mixed_With-Separators")).toBe(
        "mixed_with_separators",
      );
    });

    it("should preserve numbers between words", () => {
      expect(toSnakeCase("test123Case")).toBe("test123case");
      expect(toSnakeCase("version2Update")).toBe("version2update");
    });
  });

  describe("edge cases", () => {
    it("should handle single characters", () => {
      expect(toSnakeCase("a")).toBe("a");
      expect(toSnakeCase("A")).toBe("a");
    });

    it("should handle strings with leading/trailing spaces", () => {
      expect(toSnakeCase("  hello world  ")).toBe("_hello_world_");
      expect(toSnakeCase("  test  ")).toBe("_test_");
    });

    it("should handle strings with leading/trailing hyphens", () => {
      expect(toSnakeCase("--hello-world--")).toBe("_hello_world_");
      expect(toSnakeCase("-test-")).toBe("_test_");
    });

    it("should handle acronyms", () => {
      expect(toSnakeCase("HTTPSConnection")).toBe("httpsconnection");
      expect(toSnakeCase("URLParser")).toBe("urlparser");
    });
  });

  describe("error handling", () => {
    it("should throw UtilifyException for non-string inputs", () => {
      expect(() => toSnakeCase(null as any)).toThrow("Input must be a string");
      expect(() => toSnakeCase(undefined as any)).toThrow(
        "Input must be a string",
      );
      expect(() => toSnakeCase(123 as any)).toThrow("Input must be a string");
      expect(() => toSnakeCase({} as any)).toThrow("Input must be a string");
    });
  });
});
