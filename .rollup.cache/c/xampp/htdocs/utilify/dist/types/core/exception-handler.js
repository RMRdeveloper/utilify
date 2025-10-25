export default class UtilifyException extends Error {
  constructor(functionName, message) {
    super(`UtilifyException in ${functionName}: ${message}`);
    this.name = "UtilifyException";
  }
}
