import removeAccents from "../../core/strings/remove-accents";

describe("removeAccents", () => {
  describe("basic accent removal", () => {
    it("should remove accents from basic accented characters", () => {
      expect(removeAccents("café")).toBe("cafe");
      expect(removeAccents("naïve")).toBe("naive");
      expect(removeAccents("résumé")).toBe("resume");
      expect(removeAccents("piñata")).toBe("pinata");
    });

    it("should handle multiple accents in a word", () => {
      expect(removeAccents("crème brûlée")).toBe("creme brulee");
      expect(removeAccents("São Paulo")).toBe("Sao Paulo");
    });

    it("should handle uppercase accented characters", () => {
      expect(removeAccents("CAFÉ")).toBe("CAFE");
      expect(removeAccents("NAÏVE")).toBe("NAIVE");
    });

    it("should handle mixed case with accents", () => {
      expect(removeAccents("Crème Brûlée")).toBe("Creme Brulee");
    });
  });

  describe("empty and whitespace strings", () => {
    it("should return empty string for empty input", () => {
      expect(removeAccents("")).toBe("");
    });

    it("should preserve whitespace", () => {
      expect(removeAccents("café au lait")).toBe("cafe au lait");
      expect(removeAccents("  café  ")).toBe("  cafe  ");
      expect(removeAccents("\tcafé\n")).toBe("\tcafe\n");
    });
  });

  describe("strings without accents", () => {
    it("should return unchanged strings without accents", () => {
      expect(removeAccents("hello")).toBe("hello");
      expect(removeAccents("world")).toBe("world");
      expect(removeAccents("test123")).toBe("test123");
    });
  });

  describe("special characters and punctuation", () => {
    it("should preserve special characters", () => {
      expect(removeAccents("café@domain.com")).toBe("cafe@domain.com");
      expect(removeAccents("piñata!")).toBe("pinata!");
      expect(removeAccents("résumé.pdf")).toBe("resume.pdf");
    });

    it("should handle numbers and symbols", () => {
      expect(removeAccents("123café")).toBe("123cafe");
      expect(removeAccents("café#test")).toBe("cafe#test");
    });
  });

  describe("unicode and international characters", () => {
    it("should handle various European accents", () => {
      expect(removeAccents("Björk")).toBe("Bjork");
      expect(removeAccents("Müller")).toBe("Muller");
      expect(removeAccents("François")).toBe("Francois");
      expect(removeAccents("José")).toBe("Jose");
    });

    it("should handle non-Latin scripts (unchanged)", () => {
      expect(removeAccents("你好")).toBe("你好");
      expect(removeAccents("مرحبا")).toBe("مرحبا");
      expect(removeAccents("こんにちは")).toBe("こんにちは");
    });

    it("should handle emoji", () => {
      expect(removeAccents("café😀")).toBe("cafe😀");
      expect(removeAccents("🌍résumé")).toBe("🌍resume");
    });
  });

  describe("edge cases", () => {
    it("should handle strings with only accents", () => {
      expect(removeAccents("áéíóú")).toBe("aeiou");
      expect(removeAccents("àèìòù")).toBe("aeiou");
    });

    it("should handle single accented characters", () => {
      expect(removeAccents("á")).toBe("a");
      expect(removeAccents("é")).toBe("e");
      expect(removeAccents("ñ")).toBe("n");
    });

    it("should handle combining marks", () => {
      expect(removeAccents("a\u0301")).toBe("a"); // a with combining acute
      expect(removeAccents("n\u0303")).toBe("n"); // n with combining tilde
    });
  });

  describe("error handling", () => {
    it("should throw UtilifyException for non-string inputs", () => {
      expect(() => removeAccents(null as any)).toThrow(
        "Input must be a string",
      );
      expect(() => removeAccents(undefined as any)).toThrow(
        "Input must be a string",
      );
      expect(() => removeAccents(123 as any)).toThrow("Input must be a string");
      expect(() => removeAccents({} as any)).toThrow("Input must be a string");
      expect(() => removeAccents([] as any)).toThrow("Input must be a string");
    });
  });
});
