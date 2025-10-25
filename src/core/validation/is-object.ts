/**
 * Checks if the provided value is an object (but not an array).
 *
 * @param {unknown} value - The value to check
 * @returns {value is Record<string, unknown>} - True if the value is an object, false otherwise
 */
const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
};

export default isObject;
