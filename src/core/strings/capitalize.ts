import UtilifyException from "../exception-handler";

/**
 * Capitalizes a string by uppercasing the first character and leaving the rest of the string unchanged.
 *
 * @param {string} value - The string to capitalize
 * @returns {string} - The capitalized string
 * @throws {UtilifyException} - If the input is not a string
 */
const capitalize = (value: string): string => {
  if (typeof value !== "string") {
    throw new UtilifyException("capitalize", "Input must be a string");
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default capitalize;
