"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const exception_handler_1 = __importDefault(require("../exception-handler"));
const safe_run_1 = __importDefault(require("../runners/safe-run"));
const capitalize = (value) => {
  return (0, safe_run_1.default)(() => {
    try {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } catch (error) {
      throw new exception_handler_1.default(
        "capitalize",
        "Failed to capitalize value.",
      );
    }
  }, value);
};
exports.default = capitalize;
//# sourceMappingURL=capitalize.js.map
