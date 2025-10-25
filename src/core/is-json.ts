import UtilifyException from "@/core/exception-handler";
import safeRun from "@/core/runners/safe-run";

const isJson = (value: unknown): value is string => {
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
