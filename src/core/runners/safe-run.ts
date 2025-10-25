import UtilifyException from "@/core/exception-handler";

const safeRun = <T>(fn: () => T, defaultValue: T): T => {
  try {
    return fn();
  } catch (error) {
    if (error instanceof UtilifyException) {
      console.error(error.message);
    }
    return defaultValue;
  }
};

export default safeRun;
