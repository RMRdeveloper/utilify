"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const exception_handler_1 = __importDefault(require("./exception-handler"));
const safe_run_1 = __importDefault(require("./runners/safe-run"));
const isJson = (value) => {
  return (0, safe_run_1.default)(() => {
    try {
      if (typeof value !== "string") {
        return false;
      }
      JSON.parse(value);
      return true;
    } catch (error) {
      throw new exception_handler_1.default(
        "isJson",
        "Failed to determine if value is a valid JSON string.",
      );
    }
  }, false);
};
exports.default = isJson;
//# sourceMappingURL=is-json.js.map
