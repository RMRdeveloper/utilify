import isJson from "./core/validation/is-json";
import isObject from "./core/validation/is-object";
import isEmpty from "./core/validation/is-empty";
import capitalize from "./core/strings/capitalize";
import debounce from "./core/ejecution/debounce";

class Utilify {
  static isJson = (value: unknown) => isJson(value);
  static isObject = (value: unknown) => isObject(value);
  static isEmpty = (value: unknown) => isEmpty(value);
  static capitalize = (value: string) => capitalize(value);
  static debounce = <T extends (...args: any[]) => any>(
    fn: T,
    delay?: number,
  ) => debounce(fn, delay);
}

export default Utilify;
