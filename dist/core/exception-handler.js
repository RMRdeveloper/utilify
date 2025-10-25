"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UtilifyException extends Error {
  constructor(functionName, message) {
    super(`UtilifyException in ${functionName}: ${message}`);
    this.name = "UtilifyException";
  }
}
exports.default = UtilifyException;
//# sourceMappingURL=exception-handler.js.map
