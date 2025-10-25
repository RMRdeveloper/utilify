import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

/**
 * Checks if the provided value is an object (but not an array).
 *
 * @param {unknown} value - The value to check
 * @returns {value is Record<string, unknown>} - True if the value is an object, false otherwise
 */
const isObject = (value: unknown): value is Record<string, unknown> => {
  return safeRun(() => {
    try {
      return (
        typeof value === "object" && !Array.isArray(value) && value !== null
      );
    } catch (error) {
      throw new UtilifyException(
        "isObject",
        "Failed to determine if value is an object.",
      );
    }
  }, false);
};

export default isObject;
