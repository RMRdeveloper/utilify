import UtilifyException from "../core/exception-handler";
import legacySafeRun, {
  safeRun,
  safeRunAsync,
  SafeResult,
} from "../core/runners/safe-run";

describe("safeRun", () => {
  it("should return success result when function executes successfully", () => {
    const result = safeRun(() => JSON.parse('{"test": true}'));
    expect(result).toEqual({
      success: true,
      result: { test: true },
    });
    expect(result.success).toBe(true);
    expect(result).toHaveProperty("result");
    expect(result).not.toHaveProperty("error");
  });

  it("should return error result when function throws", () => {
    const result = safeRun(() => {
      throw new Error("Test error");
    });
    expect(result).toEqual({
      success: false,
      error: new Error("Test error"),
    });
    expect(result.success).toBe(false);
    expect(result).toHaveProperty("error");
    expect(result).not.toHaveProperty("result");
  });

  it("should handle different return types correctly", () => {
    // String
    const stringResult = safeRun(() => "hello");
    expect(stringResult).toEqual({ success: true, result: "hello" });

    // Number
    const numberResult = safeRun(() => 42);
    expect(numberResult).toEqual({ success: true, result: 42 });

    // Object
    const objectResult = safeRun(() => ({ key: "value" }));
    expect(objectResult).toEqual({ success: true, result: { key: "value" } });

    // Array
    const arrayResult = safeRun(() => [1, 2, 3]);
    expect(arrayResult).toEqual({ success: true, result: [1, 2, 3] });

    // Boolean
    const boolResult = safeRun(() => true);
    expect(boolResult).toEqual({ success: true, result: true });

    // Null
    const nullResult = safeRun(() => null);
    expect(nullResult).toEqual({ success: true, result: null });

    // Undefined
    const undefinedResult = safeRun(() => undefined);
    expect(undefinedResult).toEqual({ success: true, result: undefined });
  });

  it("should throw UtilifyException when fn is not a function", () => {
    expect(() => safeRun("not a function" as any)).toThrow(
      "First argument must be a function",
    );
    expect(() => safeRun(null as any)).toThrow(
      "First argument must be a function",
    );
    expect(() => safeRun(undefined as any)).toThrow(
      "First argument must be a function",
    );
    expect(() => safeRun(123 as any)).toThrow(
      "First argument must be a function",
    );
    expect(() => safeRun({} as any)).toThrow(
      "First argument must be a function",
    );
    expect(() => safeRun([] as any)).toThrow(
      "First argument must be a function",
    );
  });

  it("should handle different types of thrown values", () => {
    // String error
    const stringError = safeRun(() => {
      throw "string error";
    });
    expect(stringError).toEqual({ success: false, error: "string error" });

    // Number error
    const numberError = safeRun(() => {
      throw 404;
    });
    expect(numberError).toEqual({ success: false, error: 404 });

    // Object error
    const objectError = safeRun(() => {
      throw { code: 500 };
    });
    expect(objectError).toEqual({ success: false, error: { code: 500 } });

    // Custom Error
    const customError = safeRun(() => {
      throw new TypeError("Type error");
    });
    expect(customError.success).toBe(false);
    if (!customError.success) {
      expect(customError.error).toBeInstanceOf(TypeError);
      expect(customError.error.message).toBe("Type error");
    }
  });

  it("should handle functions that return promises (but not await them)", () => {
    const promiseResult = safeRun(() => Promise.resolve("async result"));
    expect(promiseResult.success).toBe(true);
    if (promiseResult.success) {
      expect(promiseResult.result).toBeInstanceOf(Promise);
    }
  });

  it("should handle complex nested operations", () => {
    const complexResult = safeRun(() => {
      const data = { users: [{ id: 1, name: "John" }] };
      return data.users.find((u) => u.id === 1)?.name.toUpperCase();
    });
    expect(complexResult).toEqual({ success: true, result: "JOHN" });
  });

  it("should handle functions with side effects", () => {
    let counter = 0;
    const sideEffectResult = safeRun(() => {
      counter++;
      return counter;
    });
    expect(sideEffectResult).toEqual({ success: true, result: 1 });
    expect(counter).toBe(1);
  });
});

describe("safeRunAsync", () => {
  it("should return success result when async function resolves", async () => {
    const result = await safeRunAsync(async () => {
      return await Promise.resolve({ data: "success" });
    });
    expect(result).toEqual({
      success: true,
      result: { data: "success" },
    });
    expect(result.success).toBe(true);
    expect(result).toHaveProperty("result");
    expect(result).not.toHaveProperty("error");
  });

  it("should return error result when async function rejects", async () => {
    const result = await safeRunAsync(async () => {
      throw new Error("Async error");
    });
    expect(result).toEqual({
      success: false,
      error: new Error("Async error"),
    });
    expect(result.success).toBe(false);
    expect(result).toHaveProperty("error");
    expect(result).not.toHaveProperty("result");
  });

  it("should handle Promise rejection with different types", async () => {
    // String rejection
    const stringReject = await safeRunAsync(async () => {
      return Promise.reject("string rejection");
    });
    expect(stringReject).toEqual({ success: false, error: "string rejection" });

    // Object rejection
    const objectReject = await safeRunAsync(async () => {
      return Promise.reject({ status: 404, message: "Not found" });
    });
    expect(objectReject).toEqual({
      success: false,
      error: { status: 404, message: "Not found" },
    });
  });

  it("should handle synchronous errors in async functions", async () => {
    const result = await safeRunAsync(async () => {
      throw new Error("Sync error in async function");
    });
    expect(result).toEqual({
      success: false,
      error: new Error("Sync error in async function"),
    });
  });

  it("should throw UtilifyException when fn is not a function", async () => {
    await expect(safeRunAsync("not a function" as any)).rejects.toThrow(
      "First argument must be a function",
    );
    await expect(safeRunAsync(null as any)).rejects.toThrow(
      "First argument must be a function",
    );
  });

  it("should handle complex async operations", async () => {
    const result = await safeRunAsync(async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1",
      );
      if (!response.ok) throw new Error("Network error");
      return await response.json();
    });

    // This might succeed or fail depending on network, but the structure should be correct
    if (result.success) {
      expect(typeof result.result).toBe("object");
      expect(result.result).toHaveProperty("id");
    } else {
      expect(result.error).toBeDefined();
    }
  });
});

describe("TypeScript type inference", () => {
  it("should correctly infer types for safeRun", () => {
    const stringResult = safeRun(() => "hello");
    expectType<SafeResult<string>>(stringResult);

    const numberResult = safeRun(() => 42);
    expectType<SafeResult<number>>(numberResult);

    const objectResult = safeRun(() => ({ key: "value" }));
    expectType<SafeResult<{ key: string }>>(objectResult);
  });

  it("should correctly infer types for safeRunAsync", async () => {
    const stringResult = await safeRunAsync(async () => "hello");
    expectType<SafeResult<string>>(stringResult);

    const numberResult = await safeRunAsync(async () => Promise.resolve(42));
    expectType<SafeResult<number>>(numberResult);

    const objectResult = await safeRunAsync(async () => ({ key: "value" }));
    expectType<SafeResult<{ key: string }>>(objectResult);
  });
});

// Helper function for type checking in tests
function expectType<T>(value: T): void {
  // This function is only used for TypeScript type checking
}

describe("legacySafeRun", () => {
  it("should return the result when function executes successfully", () => {
    const result = legacySafeRun(() => "success", "default");
    expect(result).toBe("success");
  });

  it("should return default value when function throws", () => {
    const result = legacySafeRun(() => {
      throw new Error("Test error");
    }, "default");
    expect(result).toBe("default");
  });

  it("should return default value when function throws UtilifyException", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const result = legacySafeRun(() => {
      throw new UtilifyException("test", "UtilifyException");
    }, "default");
    expect(result).toBe("default");
    expect(consoleSpy).toHaveBeenCalledWith(
      "UtilifyException in test: UtilifyException",
    );
    consoleSpy.mockRestore();
  });

  it("should handle different return types correctly", () => {
    // String
    const stringResult = legacySafeRun(() => "hello", "default");
    expect(stringResult).toBe("hello");

    // Number
    const numberResult = legacySafeRun(() => 42, 0);
    expect(numberResult).toBe(42);

    // Object
    const objectResult = legacySafeRun(() => ({ key: "value" }), {
      key: "default",
    });
    expect(objectResult).toEqual({ key: "value" });

    // Array
    const arrayResult = legacySafeRun(() => [1, 2, 3], []);
    expect(arrayResult).toEqual([1, 2, 3]);

    // Boolean
    const boolResult = legacySafeRun(() => true, false);
    expect(boolResult).toBe(true);

    // Null
    const nullResult = legacySafeRun(() => null, "default");
    expect(nullResult).toBe(null);

    // Undefined
    const undefinedResult = legacySafeRun(() => undefined, "default");
    expect(undefinedResult).toBe(undefined);
  });

  it("should throw UtilifyException when fn is not a function", () => {
    expect(() => legacySafeRun("not a function" as any, "default")).toThrow(
      "First argument must be a function",
    );
    expect(() => legacySafeRun(null as any, "default")).toThrow(
      "First argument must be a function",
    );
    expect(() => legacySafeRun(undefined as any, "default")).toThrow(
      "First argument must be a function",
    );
    expect(() => legacySafeRun(123 as any, "default")).toThrow(
      "First argument must be a function",
    );
    expect(() => legacySafeRun({} as any, "default")).toThrow(
      "First argument must be a function",
    );
    expect(() => legacySafeRun([] as any, "default")).toThrow(
      "First argument must be a function",
    );
  });

  it("should handle different types of thrown values", () => {
    // String error
    const stringError = legacySafeRun(() => {
      throw "string error";
    }, "default");
    expect(stringError).toBe("default");

    // Number error
    const numberError = legacySafeRun(() => {
      throw 404;
    }, "default");
    expect(numberError).toBe("default");

    // Object error
    const objectError = legacySafeRun(() => {
      throw { code: 500 };
    }, "default");
    expect(objectError).toBe("default");

    // Custom Error
    const customError = legacySafeRun(() => {
      throw new TypeError("Type error");
    }, "default");
    expect(customError).toBe("default");
  });

  it("should handle functions with side effects", () => {
    let counter = 0;
    const sideEffectResult = legacySafeRun(() => {
      counter++;
      return counter;
    }, 0);
    expect(sideEffectResult).toBe(1);
    expect(counter).toBe(1);
  });
});
