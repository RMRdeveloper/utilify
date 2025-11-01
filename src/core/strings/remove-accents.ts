import UtilifyException from "../exception-handler";

/**
 * Removes accents from a string.
 *
 * @param {string} value - The string from which to remove accents
 * @returns {string} - The string without accents
 * @throws {UtilifyException} - If the input is not a string
 */
const removeAccents = (value: string): string => {
  if (typeof value !== "string") {
    throw new UtilifyException("removeAccents", "Input must be a string");
  }

  if (value === "") {
    return "";
  }

  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default removeAccents;
