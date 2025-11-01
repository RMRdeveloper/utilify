type FileSizeUnit = "B" | "KB" | "MB" | "GB" | "TB";
type FileLike = File | Blob | Buffer | {
    size: number;
};

declare function flow<A, B>(f1: (a: A) => B, f2: (b: B) => any): (input: A) => any;
declare function flow<A, B, C>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => any): (input: A) => any;
declare function flow<A, B, C, D>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => any): (input: A) => any;
declare function flow<A, B, C, D, E>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => any): (input: A) => any;
declare function flow<A, B, C, D, E, F>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => any): (input: A) => any;
declare function flow<A, B, C, D, E, F, G>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => any): (input: A) => any;
declare function flow<A, B, C, D, E, F, G, H>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H, f8: (h: H) => any): (input: A) => any;
declare function flow<A, B, C, D, E, F, G, H, I>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H, f8: (h: H) => I, f9: (i: I) => any): (input: A) => any;
declare function flow<A, B, C, D, E, F, G, H, I, J>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H, f8: (h: H) => I, f9: (i: I) => J, f10: (j: J) => any): (input: A) => any;

interface Paginated<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
declare function paginateArray<T>(items: T[], opts?: {
    page?: number;
    pageSize?: number;
    zeroBased?: boolean;
}): Paginated<T>;

type SafeResult<T> = {
    success: true;
    result: T;
} | {
    success: false;
    error: any;
};
declare function safeRun<T>(fn: () => T): SafeResult<T>;
declare function safeRunAsync<T>(fn: () => Promise<T>): Promise<SafeResult<T>>;

declare function createUtils<TBase extends Record<string, any>, TExt extends Record<string, any>>(base: TBase, ext: Partial<TExt>, options?: {
    freezeBase?: boolean;
    freezeResult?: boolean;
}): TBase & TExt;

declare const _default: {
    isJson: (value: unknown) => boolean;
    isObject: (value: unknown) => value is Record<string, unknown>;
    isEmpty: (value: unknown) => boolean;
    capitalize: (value: string) => string;
    toKebabCase: (value: string) => string;
    toSnakeCase: (value: string) => string;
    trim: (value: string) => string;
    removeAccents: (value: string) => string;
    getFileExtension: (filename: string) => string;
    getFileSize: (input: FileLike, unit: FileSizeUnit) => string;
    debounce: <T extends (...args: any[]) => any>(fn: T, delay?: number) => T;
    flow: typeof flow;
    safeRun: typeof safeRun;
    safeRunAsync: typeof safeRunAsync;
    paginateArray: typeof paginateArray;
    createUtils: typeof createUtils;
} & Record<string, any>;

export { _default as default };
