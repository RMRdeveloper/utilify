import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

/**
 * Capitalizes a string by uppercasing the first character and leaving the rest of the string unchanged.
 *
 * @param {string} value - The string to capitalize
 * @returns {string} - The capitalized string
 * @throws {UtilifyException} - If the value can't be capitalized
 */
const capitalize = (value: string): string => {
  return safeRun(() => {
    try {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } catch (error) {
      throw new UtilifyException("capitalize", "Failed to capitalize value.");
    }
  }, value);
};

export default capitalize;
