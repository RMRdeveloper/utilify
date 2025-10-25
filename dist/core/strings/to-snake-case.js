"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const exception_handler_1 = __importDefault(require("../exception-handler"));
const safe_run_1 = __importDefault(require("../runners/safe-run"));
const toSnakeCase = (value) => {
  return (0, safe_run_1.default)(() => {
    try {
      return value
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s-]+/g, "_")
        .toLowerCase();
    } catch (error) {
      throw new exception_handler_1.default(
        "toSnakeCase",
        "Failed to convert string to snake_case.",
      );
    }
  }, "");
};
exports.default = toSnakeCase;
//# sourceMappingURL=to-snake-case.js.map
