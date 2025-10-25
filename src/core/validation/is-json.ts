/**
 * Checks if a value is a valid JSON string.
 *
 * @param {unknown} value - The value to check
 * @returns {boolean} - True if the value is a valid JSON string, false otherwise
 */
const isJson = (value: unknown): boolean => {
  if (typeof value !== "string") {
    return false;
  }

  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

export default isJson;
