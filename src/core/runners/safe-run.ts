import UtilifyException from "../exception-handler";

/**
 * Result type for safe execution functions
 */
export type SafeResult<T> =
  | {
      success: true;
      result: T;
    }
  | {
      success: false;
      error: any;
    };

function validateFunction(fn: any, functionName: string): void {
  if (typeof fn !== "function") {
    throw new UtilifyException(
      functionName,
      "First argument must be a function",
    );
  }
}

function createSuccessResult<T>(result: T): SafeResult<T> {
  return { success: true, result };
}

function createErrorResult<T>(error: any): SafeResult<T> {
  return { success: false, error };
}

/**
 * Runs a given function in a safe execution context, catching any errors and returning a structured result.
 * @template T - The return type of the function
 * @param {() => T} fn - The function to run in a safe execution context
 * @returns {SafeResult<T>} - A structured result with success status, result or error
 * @throws {UtilifyException} If fn is not a function
 */
function safeRun<T>(fn: () => T): SafeResult<T> {
  validateFunction(fn, "safeRun");

  try {
    const result = fn();
    return createSuccessResult(result);
  } catch (error) {
    return createErrorResult(error);
  }
}

/**
 * Runs an asynchronous function in a safe execution context, catching any errors and returning a structured result.
 * @template T - The resolved type of the Promise
 * @param {() => Promise<T>} fn - The async function to run in a safe execution context
 * @returns {Promise<SafeResult<T>>} - A Promise resolving to a structured result with success status, result or error
 * @throws {UtilifyException} If fn is not a function
 */
async function safeRunAsync<T>(fn: () => Promise<T>): Promise<SafeResult<T>> {
  validateFunction(fn, "safeRunAsync");

  try {
    const result = await fn();
    return createSuccessResult(result);
  } catch (error) {
    return createErrorResult(error);
  }
}

/**
 * Legacy safeRun function that returns a default value instead of structured result.
 * @deprecated Use safeRun instead for better error handling
 */
const legacySafeRun = <T>(fn: () => T, defaultValue: T): T => {
  if (typeof fn !== "function") {
    throw new UtilifyException("safeRun", "First argument must be a function");
  }

  try {
    return fn();
  } catch (error) {
    if (error instanceof UtilifyException) {
      console.error(error.message);
    }
    return defaultValue;
  }
};

export default legacySafeRun;
export { safeRun, safeRunAsync };
