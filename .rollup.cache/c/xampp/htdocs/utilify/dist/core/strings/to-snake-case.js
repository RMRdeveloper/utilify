import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";
const toSnakeCase = (value) => {
  return safeRun(() => {
    try {
      return value
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s-]+/g, "_")
        .toLowerCase();
    } catch (error) {
      throw new UtilifyException(
        "toSnakeCase",
        "Failed to convert string to snake_case.",
      );
    }
  }, "");
};
export default toSnakeCase;
