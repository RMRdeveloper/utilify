import flow from "./core/runners/flow";
declare class Utilify {
    static isJson: (value: unknown) => value is string;
    static isObject: (value: unknown) => value is Record<string, unknown>;
    static isEmpty: (value: unknown) => boolean;
    static capitalize: (value: string) => string;
    static toKebabCase: (value: string) => string;
    static toSnakeCase: (value: string) => string;
    static debounce: <T extends (...args: any[]) => any>(fn: T, delay?: number) => () => void;
    static flow: typeof flow;
}
export default Utilify;
