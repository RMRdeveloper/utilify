import UtilifyException from "../exception-handler";
const safeRun = (fn, defaultValue) => {
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
