import flow from "./core/runners/flow";
import { safeRun, safeRunAsync } from "./core/runners/safe-run";
declare const Utilify: {
    isJson: (value: unknown) => boolean;
    isObject: (value: unknown) => value is Record<string, unknown>;
    isEmpty: (value: unknown) => boolean;
    capitalize: (value: string) => string;
    toKebabCase: (value: string) => string;
    toSnakeCase: (value: string) => string;
    trim: (value: string) => string;
    getFileExtension: (filename: string) => string;
    getFileSize: (input: import("./core/files/get-file-size").FileLike, unit: import("./core/files/get-file-size").FileSizeUnit) => string;
    debounce: <T extends (...args: any[]) => any>(fn: T, delay?: number) => T;
    flow: typeof flow;
    safeRun: typeof safeRun;
    safeRunAsync: typeof safeRunAsync;
} & Record<string, any>;
export default Utilify;
