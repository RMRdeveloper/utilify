import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";
const toKebabCase = (value) => {
  return safeRun(() => {
    try {
      return value
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
    } catch (error) {
      throw new UtilifyException(
        "toKebabCase",
        "Failed to convert string to kebab-case.",
      );
    }
  }, "");
};
export default toKebabCase;
