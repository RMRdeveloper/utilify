declare class Utilify {
  static isJson(value: unknown): boolean;
  static isObject(value: unknown): boolean;
  static isEmpty(value: unknown): boolean;
  static capitalize(value: string): string;
  static debounce<T extends (...args: any[]) => any>(fn: T, delay?: number): T;
}

export default Utilify;
export as namespace Utilify;
export * from "./core/validation/is-json";
export * from "./core/validation/is-object";
export * from "./core/validation/is-empty";
export * from "./core/strings/capitalize";
export * from "./core/ejecution/debounce";
