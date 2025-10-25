import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

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
