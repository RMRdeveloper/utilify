import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";
const isJson = (value) => {
  return safeRun(() => {
    try {
      if (typeof value !== "string") {
        return false;
      }
      JSON.parse(value);
      return true;
    } catch (error) {
      throw new UtilifyException(
        "isJson",
        "Failed to determine if value is a valid JSON string.",
      );
    }
  }, false);
};
export default isJson;
