import isJson from "./core/validation/is-json";
import isObject from "./core/validation/is-object";
import isEmpty from "./core/validation/is-empty";
import capitalize from "./core/strings/capitalize";
import toKebabCase from "./core/strings/to-kebab-case";
import toSnakeCase from "./core/strings/to-snake-case";
import trim from "./core/strings/trim";
import getFileExtension from "./core/files/get-file-extension";
import getFileSize from "./core/files/get-file-size";
import debounce from "./core/execution/debounce";
import flow from "./core/runners/flow";
import { safeRun, safeRunAsync } from "./core/runners/safe-run";
import createUtils from "./createUtils";

const baseUtils = {
  isJson,
  isObject,
  isEmpty,
  capitalize,
  toKebabCase,
  toSnakeCase,
  trim,
  getFileExtension,
  getFileSize,
  debounce,
  flow,
  safeRun,
  safeRunAsync,
};

const Utilify = createUtils(baseUtils, {}, { freezeResult: true });

export default Utilify;
