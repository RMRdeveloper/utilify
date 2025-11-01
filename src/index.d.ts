declare const Utilify: {
  readonly isJson: (value: unknown) => boolean;
  readonly isObject: (value: unknown) => boolean;
  readonly isEmpty: (value: unknown) => boolean;
  readonly capitalize: (value: string) => string;
  readonly toKebabCase: (value: string) => string;
  readonly toSnakeCase: (value: string) => string;
  readonly trim: (value: string) => string;
  readonly removeAccents: (value: string) => string;
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
  readonly safeRun: <T>(
    fn: () => T,
  ) => import("./core/runners/safe-run").SafeResult<T>;
  readonly safeRunAsync: <T>(
    fn: () => Promise<T>,
  ) => Promise<import("./core/runners/safe-run").SafeResult<T>>;
  readonly paginateArray: <T>(
    items: T[],
    opts?: {
      page?: number;
      pageSize?: number;
      zeroBased?: boolean;
    },
  ) => import("./core/arrays/paginate-array").Paginated<T>;
};

export default Utilify;
export as namespace Utilify;
export { default as isJson } from "./core/validation/is-json";
export { default as isObject } from "./core/validation/is-object";
export { default as isEmpty } from "./core/validation/is-empty";
export { default as capitalize } from "./core/strings/capitalize";
export { default as toKebabCase } from "./core/strings/to-kebab-case";
export { default as toSnakeCase } from "./core/strings/to-snake-case";
export { default as trim } from "./core/strings/trim";
export { default as removeAccents } from "./core/strings/remove-accents";
export { default as getFileExtension } from "./core/files/get-file-extension";
export {
  default as getFileSize,
  type FileSizeUnit,
} from "./core/files/get-file-size";
export { default as debounce } from "./core/execution/debounce";
export { default as flow } from "./core/runners/flow";
export {
  safeRun,
  safeRunAsync,
  type SafeResult,
} from "./core/runners/safe-run";
export { default as createUtils } from "./createUtils";
export { default as paginateArray } from "./core/arrays/paginate-array";
