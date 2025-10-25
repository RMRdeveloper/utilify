import UtilifyException from "../exception-handler";
import safeRun from "../runners/safe-run";

const capitalize = (value: string): string => {
  return safeRun(() => {
    try {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } catch (error) {
      throw new UtilifyException("capitalize", "Failed to capitalize value.");
    }
  }, value);
};

export default capitalize;
