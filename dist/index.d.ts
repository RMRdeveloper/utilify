import flow from "./core/runners/flow";
declare class Utilify {
    static isJson: (value: unknown) => boolean;
    static isObject: (value: unknown) => value is Record<string, unknown>;
    static isEmpty: (value: unknown) => boolean;
    static capitalize: (value: string) => string;
    static toKebabCase: (value: string) => string;
    static toSnakeCase: (value: string) => string;
    static trim: (value: string) => string;
    static getFileExtension: (filename: string) => string;
    static getFileSize: (input: import("./core/files/get-file-size").FileLike, unit: import("./core/files/get-file-size").FileSizeUnit) => string;
    static debounce: <T extends (...args: any[]) => any>(fn: T, delay?: number) => T;
    static flow: typeof flow;
}
export default Utilify;
