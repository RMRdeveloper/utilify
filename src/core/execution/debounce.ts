import UtilifyException from "../exception-handler";

/**
 * Debounces a function by a given amount of time.
 * @template T - The function type to debounce
 * @param {T} fn - The function to debounce
 * @param {number} [delay=250] - The time in milliseconds to debounce the function
 * @returns {T} The debounced function
 * @throws {UtilifyException} If the input is not a function or delay is invalid
 */
const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 250,
): T => {
  if (typeof fn !== "function") {
    throw new UtilifyException("debounce", "First argument must be a function");
  }

  if (typeof delay !== "number" || delay < 0 || !isFinite(delay)) {
    throw new UtilifyException(
      "debounce",
      "Delay must be a non-negative number",
    );
  }

  let timeout: NodeJS.Timeout;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  }) as T;
};

export default debounce;
