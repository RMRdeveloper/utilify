declare class Utilify {
  static isJson(value: unknown): boolean;
  static isObject(value: unknown): boolean;
  static isEmpty(value: unknown): boolean;
}

export default Utilify;
export as namespace Utilify;
export * from "./core/is-json";
export * from "./core/is-object";
export * from "./core/is-empty";
