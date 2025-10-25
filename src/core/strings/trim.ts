import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

/**
 * Removes whitespace from both ends of a string.
 *
 * @param {string} value - The string to trim
 * @returns {string} - The trimmed string
 * @throws {UtilifyException} - If the value can't be trimmed
 */
const trim = (value: string): string => {
  return safeRun(() => {
    try {
      return value.trim();
    } catch (error) {
      throw new UtilifyException("trim", "Failed to trim value.");
    }
  }, "");
};

export default trim;
