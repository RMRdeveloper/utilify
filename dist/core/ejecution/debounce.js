"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const exception_handler_1 = __importDefault(require("../exception-handler"));
const safe_run_1 = __importDefault(require("../runners/safe-run"));
const debounce = (fn, delay = 250) => {
  return (0, safe_run_1.default)(
    () => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fn();
        }, delay);
      };
    },
    () => {
      throw new exception_handler_1.default(
        "debounce",
        "Failed to debounce function.",
      );
    },
  );
};
exports.default = debounce;
//# sourceMappingURL=debounce.js.map
