import isJson from "./core/is-json";
import isObject from "./core/is-object";
import isEmpty from "./core/is-empty";

class Utilify {
  static isJson(value: unknown): boolean {
    return isJson(value);
  }

  static isObject(value: unknown): boolean {
    return isObject(value);
  }

  static isEmpty(value: unknown): boolean {
    return isEmpty(value);
  }
}

export default Utilify;
