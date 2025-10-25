import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";
const debounce = (fn, delay = 250) => {
  return safeRun(
    () => {
      let timeout;
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
