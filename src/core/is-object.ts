import UtilifyException from "./exception-handler";
import safeRun from "./runners/safe-run";

const isObject = (value: unknown): value is Record<string, unknown> => {
  return safeRun(() => {
    try {
      return (
        typeof value === "object" && !Array.isArray(value) && value !== null
      );
    } catch (error) {
      throw new UtilifyException(
        "isObject",
        "Failed to determine if value is an object.",
      );
    }
  }, false);
};

export default isObject;
