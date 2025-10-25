declare class Utilify {
  static isJson(value: unknown): boolean;
  static isObject(value: unknown): boolean;
  static isEmpty(value: unknown): boolean;
  static capitalize(value: string): string;
  static toKebabCase(value: string): string;
  static toSnakeCase(value: string): string;
  static trim(value: string): string;
  static debounce<T extends (...args: any[]) => any>(fn: T, delay?: number): T;
  static flow: typeof import("./core/runners/flow").default;
}

export default Utilify;
export as namespace Utilify;
export * from "./core/validation/is-json";
export * from "./core/validation/is-object";
export * from "./core/validation/is-empty";
export * from "./core/strings/capitalize";
export * from "./core/strings/to-kebab-case";
export * from "./core/strings/to-snake-case";
export { default as trim } from "./core/strings/trim";
export * from "./core/ejecution/debounce";
export { default as flow } from "./core/runners/flow";
