import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

/**
 * Debounces a function by a given amount of time.
 * @param {function} fn The function to debounce.
 * @param {number} [delay=250] The time in milliseconds to debounce the function.
 * @returns {function} The debounced function.
 * @throws {UtilifyException} If the function fails to debounce.
 */
const debounce = (fn: () => void, delay: number = 250) => {
  return safeRun(
    () => {
      let timeout: NodeJS.Timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fn();
        }, delay);
      };
    },
    () => {
      throw new UtilifyException("debounce", "Failed to debounce function.");
    },
  );
};

export default debounce;
