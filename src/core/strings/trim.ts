import UtilifyException from "../exception-handler";

/**
 * Removes whitespace from both ends of a string.
 *
 * @param {string} value - The string to trim
 * @returns {string} - The trimmed string
 * @throws {UtilifyException} - If the input is not a string
 */
const trim = (value: string): string => {
  if (typeof value !== "string") {
    throw new UtilifyException("trim", "Input must be a string");
  }

  return value.trim();
};

export default trim;
