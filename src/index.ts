/**
 * Utilify - A comprehensive utility library for JavaScript and TypeScript
 *
 * This module exports the main Utilify utility object containing all available
 * utility functions organized by category: validation, string manipulation,
 * file operations, execution control, and data processing.
 */

// Core utility function imports
import createUtils from "./createUtils";

// Validation function imports
import isJson from "./core/validation/is-json";
import isObject from "./core/validation/is-object";
import isEmpty from "./core/validation/is-empty";

// String manipulation function imports
import capitalize from "./core/strings/capitalize";
import toKebabCase from "./core/strings/to-kebab-case";
import toSnakeCase from "./core/strings/to-snake-case";
import trim from "./core/strings/trim";
import removeAccents from "./core/strings/remove-accents";

// File operation function imports
import getFileExtension from "./core/files/get-file-extension";
import getFileSize from "./core/files/get-file-size";

// Execution control function imports
import debounce from "./core/execution/debounce";

// Runner function imports
import flow from "./core/runners/flow";
import { safeRun, safeRunAsync } from "./core/runners/safe-run";

// Array function imports
import paginateArray from "./core/arrays/paginate-array";

/**
 * Base utility functions object containing all core utilities.
 * This object is passed to createUtils to generate the final Utilify API.
 */
const baseUtils = {
  // Validation utilities
  isJson,
  isObject,
  isEmpty,

  // String utilities
  capitalize,
  toKebabCase,
  toSnakeCase,
  trim,
  removeAccents,

  // File utilities
  getFileExtension,
  getFileSize,

  // Execution utilities
  debounce,

  // Runner utilities
  flow,
  safeRun,
  safeRunAsync,

  // Array utilities
  paginateArray,

  // Utility creation function
  createUtils,
} as const;

/**
 * Type re-exports for build compatibility and external type consumption.
 * These types are re-exported here so they are included in the distributed .d.ts file.
 */
export type { FileLike, FileSizeUnit } from "./core/files/get-file-size";
export type { SafeResult } from "./core/runners/safe-run";
export type { Paginated } from "./core/arrays/paginate-array";

/**
 * The main Utilify utility object.
 *
 * This is the default export containing all utility functions in a single,
 * frozen object for optimal performance and API consistency.
 *
 * @example
 * ```typescript
 * import utilify from 'utilifycore';
 *
 * // Use validation functions
 * console.log(utilify.isJson('{"key": "value"}')); // true
 *
 * // Use string functions
 * console.log(utilify.capitalize('hello world')); // 'Hello world'
 *
 * // Use with types
 * const result: utilify.SafeResult<string> = utilify.safeRun(() => 'success');
 * ```
 */
const Utilify = createUtils(baseUtils, {}, { freezeResult: true });

export default Utilify;
