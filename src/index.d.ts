interface Utilify {
  isJson(value: unknown): boolean;
  isObject(value: unknown): boolean;
  isEmpty(value: unknown): boolean;
}

export default Utilify;
export as namespace Utilify;
export * from "./core/is-json";
export * from "./core/is-object";
export * from "./core/is-empty";
