import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

/**
 * Converts a string to kebab-case (lowercase with hyphens).
 *
 * @param {string} value - The string to convert to kebab-case
 * @returns {string} - The kebab-case version of the string
 * @throws {UtilifyException} - If the value can't be converted to kebab-case
 */
const toKebabCase = (value: string): string => {
  return safeRun(() => {
    try {
      return value
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
    } catch (error) {
      throw new UtilifyException(
        "toKebabCase",
        "Failed to convert string to kebab-case.",
      );
    }
  }, "");
};

export default toKebabCase;
