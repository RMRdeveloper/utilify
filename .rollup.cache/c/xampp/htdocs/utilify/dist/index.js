import isJson from "./core/validation/is-json";
import isObject from "./core/validation/is-object";
import isEmpty from "./core/validation/is-empty";
import capitalize from "./core/strings/capitalize";
import toKebabCase from "./core/strings/to-kebab-case";
import toSnakeCase from "./core/strings/to-snake-case";
import debounce from "./core/ejecution/debounce";
class Utilify {
  static isJson = (value) => isJson(value);
  static isObject = (value) => isObject(value);
  static isEmpty = (value) => isEmpty(value);
  static capitalize = (value) => capitalize(value);
  static toKebabCase = (value) => toKebabCase(value);
  static toSnakeCase = (value) => toSnakeCase(value);
  static debounce = (fn, delay) => debounce(fn, delay);
}
export default Utilify;
