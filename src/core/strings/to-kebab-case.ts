import UtilifyException from "../exception-handler";

/**
 * Converts a string to kebab-case (lowercase with hyphens).
 *
 * @param {string} value - The string to convert to kebab-case
 * @returns {string} - The kebab-case version of the string
 * @throws {UtilifyException} - If the input is not a string
 */
const toKebabCase = (value: string): string => {
  if (typeof value !== "string") {
    throw new UtilifyException("toKebabCase", "Input must be a string");
  }

  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

export default toKebabCase;
