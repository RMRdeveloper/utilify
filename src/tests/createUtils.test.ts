import createUtils from "../createUtils";

describe("createUtils", () => {
  it("should merge base and extension objects", () => {
    const base = { a: 1, b: 2 };
    const ext = { c: 3 };
    const result = createUtils(base, ext);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should override base properties with extensions", () => {
    const base = { a: 1, b: 2 };
    const ext = { b: 3 };
    const result = createUtils(base, ext);
    expect(result).toEqual({ a: 1, b: 3 });
  });

  it("should freeze base if freezeBase is true", () => {
    const base = { a: 1 };
    createUtils(base, {}, { freezeBase: true });
    expect(() => {
      base.a = 2;
    }).toThrow();
  });

  it("should freeze result if freezeResult is true", () => {
    const result = createUtils({ a: 1 }, { b: 2 }, { freezeResult: true });
    expect(() => {
      result.a = 3;
    }).toThrow();
  });

  it("should not freeze base by default", () => {
    const base = { a: 1 };
    createUtils(base, {});
    expect(() => {
      base.a = 2;
    }).not.toThrow();
  });

  it("should not freeze result by default", () => {
    const result = createUtils({ a: 1 }, { b: 2 });
    expect(() => {
      result.a = 3;
    }).not.toThrow();
  });

  it("should handle empty extensions", () => {
    const base = { a: 1, b: 2 };
    const result = createUtils(base, {});
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("should handle empty base", () => {
    const ext = { c: 3, d: 4 };
    const result = createUtils({}, ext);
    expect(result).toEqual({ c: 3, d: 4 });
  });
});
