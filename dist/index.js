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
class Utilify {
  static isJson = (value) => (0, is_json_1.default)(value);
  static isObject = (value) => (0, is_object_1.default)(value);
  static isEmpty = (value) => (0, is_empty_1.default)(value);
  static capitalize = (value) => (0, capitalize_1.default)(value);
}
exports.default = Utilify;
//# sourceMappingURL=index.js.map
