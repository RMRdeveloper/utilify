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
const safeRun = (fn, defaultValue) => {
  try {
    return fn();
  } catch (error) {
    if (error instanceof exception_handler_1.default) {
      console.error(error.message);
    }
    return defaultValue;
  }
};
exports.default = safeRun;
//# sourceMappingURL=safe-run.js.map
