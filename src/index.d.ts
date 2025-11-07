// Type imports
import type { FileLike, FileSizeUnit } from "./core/files/get-file-size";
import type { SafeResult } from "./core/runners/safe-run";
import type { Paginated } from "./core/arrays/paginate-array";

/**
 * The main Utilify utility object containing all available utility functions.
 * Provides a comprehensive set of utilities for validation, string manipulation,
 * file operations, execution control, and data processing.
 */
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
  readonly getFileSize: (input: FileLike, unit: FileSizeUnit) => string;
  readonly debounce: <T extends (...args: any[]) => any>(
    fn: T,
    delay?: number,
  ) => T;
  readonly flow: typeof import("./core/runners/flow").default;
  readonly safeRun: <T>(fn: () => T) => SafeResult<T>;
  readonly safeRunAsync: <T>(fn: () => Promise<T>) => Promise<SafeResult<T>>;
  readonly paginateArray: <T>(
    items: T[],
    opts?: {
      page?: number;
      pageSize?: number;
      zeroBased?: boolean;
    },
  ) => Paginated<T>;
};

// Default export
export default Utilify;

// Namespace export
export as namespace Utilify;

// Named exports - Validation functions
export { default as isJson } from "./core/validation/is-json";
export { default as isObject } from "./core/validation/is-object";
export { default as isEmpty } from "./core/validation/is-empty";

// Named exports - String functions
export { default as capitalize } from "./core/strings/capitalize";
export { default as toKebabCase } from "./core/strings/to-kebab-case";
export { default as toSnakeCase } from "./core/strings/to-snake-case";
export { default as trim } from "./core/strings/trim";
export { default as removeAccents } from "./core/strings/remove-accents";

// Named exports - File functions
export { default as getFileExtension } from "./core/files/get-file-extension";
export { default as getFileSize } from "./core/files/get-file-size";

// Named exports - Execution functions
export { default as debounce } from "./core/execution/debounce";

// Named exports - Runner functions
export { default as flow } from "./core/runners/flow";
export { safeRun, safeRunAsync } from "./core/runners/safe-run";

// Named exports - Array functions
export { default as paginateArray } from "./core/arrays/paginate-array";

// Named exports - Utility functions
export { default as createUtils } from "./createUtils";

// Named exports - Types
export type { FileLike, FileSizeUnit } from "./core/files/get-file-size";
export type { SafeResult } from "./core/runners/safe-run";
export type { Paginated } from "./core/arrays/paginate-array";
