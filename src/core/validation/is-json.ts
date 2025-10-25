import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

/**
 * Checks if a value is a valid JSON string.
 *
 * @param {unknown} value - The value to check
 * @returns {value is string} - True if the value is a valid JSON string, false otherwise
 *
 * @throws {UtilifyException} - If value is not a valid JSON string
 */
const isJson = (value: unknown): value is string => {
  return safeRun(() => {
    try {
      if (typeof value !== "string") {
        return false;
      }

      JSON.parse(value);
      return true;
    } catch (error) {
      throw new UtilifyException(
        "isJson",
        "Failed to determine if value is a valid JSON string.",
      );
    }
  }, false);
};

export default isJson;
