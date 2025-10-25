import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

const isEmpty = (value: unknown): boolean => {
  return safeRun(() => {
    try {
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
    } catch (error) {
      throw new UtilifyException(
        "isEmpty",
        "Failed to determine if value is empty.",
      );
    }
  }, false);
};

export default isEmpty;
