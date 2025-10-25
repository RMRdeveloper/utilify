/**
 * Checks if a value is empty.
 *
 * @param {unknown} value - The value to check
 * @returns {boolean} - True if the value is empty, false otherwise
 *
 * Empty values include null, undefined, empty strings, empty arrays, and objects with no keys.
 */
const isEmpty = (value: unknown): boolean => {
  if (value == null) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value as Record<string, unknown>).length === 0;
  }

  return false;
};

export default isEmpty;
