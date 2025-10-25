"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const exception_handler_1 = __importDefault(
  require("@/core/exception-handler"),
);
const safe_run_1 = __importDefault(require("@/core/runners/safe-run"));
const isObject = (value) => {
  return (0, safe_run_1.default)(() => {
    try {
      return (
        typeof value === "object" && !Array.isArray(value) && value !== null
      );
    } catch (error) {
      throw new exception_handler_1.default(
        "isObject",
        "Failed to determine if value is an object.",
      );
    }
  }, false);
};
exports.default = isObject;
//# sourceMappingURL=is-object.js.map
