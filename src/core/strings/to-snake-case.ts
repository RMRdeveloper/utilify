import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

/**
 * Converts a string to snake_case (lowercase with underscores).
 *
 * @param {string} value - The string to convert to snake_case
 * @returns {string} - The snake_case version of the string
 * @throws {UtilifyException} - If the value can't be converted to snake_case
 */
const toSnakeCase = (value: string): string => {
  return safeRun(() => {
    try {
      return value
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s-]+/g, "_")
        .toLowerCase();
    } catch (error) {
      throw new UtilifyException(
        "toSnakeCase",
        "Failed to convert string to snake_case.",
      );
    }
  }, "");
};

export default toSnakeCase;
