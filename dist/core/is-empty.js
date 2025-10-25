"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const exception_handler_1 = __importDefault(require("./exception-handler"));
const safe_run_1 = __importDefault(require("./runners/safe-run"));
const isEmpty = (value) => {
  return (0, safe_run_1.default)(() => {
    try {
      if (value == null) {
        return true;
      }
      if (typeof value === "string") {
        return value.trim().length === 0;
      }
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      if (typeof value === "object") {
        return Object.keys(value).length === 0;
      }
      return false;
    } catch (error) {
      throw new exception_handler_1.default(
        "isEmpty",
        "Failed to determine if value is empty.",
      );
    }
  }, false);
};
exports.default = isEmpty;
//# sourceMappingURL=is-empty.js.map
