"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const is_json_1 = __importDefault(require("./core/validation/is-json"));
const is_object_1 = __importDefault(require("./core/validation/is-object"));
const is_empty_1 = __importDefault(require("./core/validation/is-empty"));
const capitalize_1 = __importDefault(require("./core/strings/capitalize"));
const to_kebab_case_1 = __importDefault(
  require("./core/strings/to-kebab-case"),
);
const to_snake_case_1 = __importDefault(
  require("./core/strings/to-snake-case"),
);
const debounce_1 = __importDefault(require("./core/ejecution/debounce"));
class Utilify {
  static isJson = (value) => (0, is_json_1.default)(value);
  static isObject = (value) => (0, is_object_1.default)(value);
  static isEmpty = (value) => (0, is_empty_1.default)(value);
  static capitalize = (value) => (0, capitalize_1.default)(value);
  static toKebabCase = (value) => (0, to_kebab_case_1.default)(value);
  static toSnakeCase = (value) => (0, to_snake_case_1.default)(value);
  static debounce = (fn, delay) => (0, debounce_1.default)(fn, delay);
}
exports.default = Utilify;
//# sourceMappingURL=index.js.map
