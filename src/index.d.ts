declare const Utilify: {
  readonly isJson: (value: unknown) => boolean;
  readonly isObject: (value: unknown) => boolean;
  readonly isEmpty: (value: unknown) => boolean;
  readonly capitalize: (value: string) => string;
  readonly toKebabCase: (value: string) => string;
  readonly toSnakeCase: (value: string) => string;
  readonly trim: (value: string) => string;
  readonly getFileExtension: (filename: string) => string;
  readonly getFileSize: (
    input: import("./core/files/get-file-size").FileLike,
    unit: import("./core/files/get-file-size").FileSizeUnit,
  ) => string;
  readonly debounce: <T extends (...args: any[]) => any>(
    fn: T,
    delay?: number,
  ) => T;
  readonly flow: typeof import("./core/runners/flow").default;
};

export default Utilify;
export as namespace Utilify;
export * from "./core/validation/is-json";
export * from "./core/validation/is-object";
export * from "./core/validation/is-empty";
export * from "./core/strings/capitalize";
export * from "./core/strings/to-kebab-case";
export * from "./core/strings/to-snake-case";
export { default as trim } from "./core/strings/trim";
export { default as getFileExtension } from "./core/files/get-file-extension";
export {
  default as getFileSize,
  type FileSizeUnit,
} from "./core/files/get-file-size";
export * from "./core/execution/debounce";
export { default as flow } from "./core/runners/flow";
export { default as createUtils } from "./createUtils";
