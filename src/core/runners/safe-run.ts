import UtilifyException from "../exception-handler";

/**
 * Runs a given function in a safe execution context, catching any errors and returning a default value instead.
 * If the error is an instance of UtilifyException, it logs an error message to the console.
 * @template T
 * @param {() => T} fn - The function to run in a safe execution context
 * @param {T} defaultValue - The default value to return if an error occurs
 * @returns {T} - The result of the function, or the default value if an error occurs
 * @throws {UtilifyException} If fn is not a function
 */
const safeRun = <T>(fn: () => T, defaultValue: T): T => {
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

export default safeRun;
