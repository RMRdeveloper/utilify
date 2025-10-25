import UtilifyException from "../exception-handler";

/**
 * Converts a string to snake_case (lowercase with underscores).
 *
 * @param {string} value - The string to convert to snake_case
 * @returns {string} - The snake_case version of the string
 * @throws {UtilifyException} - If the input is not a string
 */
const toSnakeCase = (value: string): string => {
  if (typeof value !== "string") {
    throw new UtilifyException("toSnakeCase", "Input must be a string");
  }

  return value
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
};

export default toSnakeCase;
