"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const exception_handler_1 = __importDefault(require("../exception-handler"));
const safe_run_1 = __importDefault(require("../runners/safe-run"));
const toKebabCase = (value) => {
  return (0, safe_run_1.default)(() => {
    try {
      return value
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
    } catch (error) {
      throw new exception_handler_1.default(
        "toKebabCase",
        "Failed to convert string to kebab-case.",
      );
    }
  }, "");
};
exports.default = toKebabCase;
//# sourceMappingURL=to-kebab-case.js.map
