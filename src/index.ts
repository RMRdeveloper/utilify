import isJson from "./core/validation/is-json";
import isObject from "./core/validation/is-object";
import isEmpty from "./core/validation/is-empty";
import capitalize from "./core/strings/capitalize";

class Utilify {
  static isJson = (value: unknown) => isJson(value);
  static isObject = (value: unknown) => isObject(value);
  static isEmpty = (value: unknown) => isEmpty(value);
  static capitalize = (value: string) => capitalize(value);
}

export default Utilify;
