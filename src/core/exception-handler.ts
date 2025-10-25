export default class UtilifyException extends Error {
  constructor(functionName: string, message: string) {
    super(`UtilifyException in ${functionName}: ${message}`);
    this.name = "UtilifyException";
  }
}
