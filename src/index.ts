import isJson from "./core/validation/is-json";
import isObject from "./core/validation/is-object";
import isEmpty from "./core/validation/is-empty";
import capitalize from "./core/strings/capitalize";
import toKebabCase from "./core/strings/to-kebab-case";
import toSnakeCase from "./core/strings/to-snake-case";
import trim from "./core/strings/trim";
import debounce from "./core/ejecution/debounce";
import flow from "./core/runners/flow";

class Utilify {
  static isJson = (value: unknown) => isJson(value);
  static isObject = (value: unknown) => isObject(value);
  static isEmpty = (value: unknown) => isEmpty(value);
  static capitalize = (value: string) => capitalize(value);
  static toKebabCase = (value: string) => toKebabCase(value);
  static toSnakeCase = (value: string) => toSnakeCase(value);
  static trim = (value: string) => trim(value);
  static debounce = <T extends (...args: any[]) => any>(
    fn: T,
    delay?: number,
  ) => debounce(fn, delay);
  static flow = flow;
}

export default Utilify;
