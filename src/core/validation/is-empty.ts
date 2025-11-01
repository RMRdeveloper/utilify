/**
 * Checks if the provided value is empty.
 *
 * Returns true if the value is null, an empty string, an empty array, an empty Map or Set, or an empty object.
 * Returns false otherwise.
 *
 * @param {unknown} value - The value to check
 * @returns {boolean} - True if the value is empty, false otherwise
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

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value as Record<string, unknown>).length === 0;
  }

  return false;
};

export default isEmpty;
