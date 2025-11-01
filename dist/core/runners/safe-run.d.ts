export type SafeResult<T> = {
    success: true;
    result: T;
} | {
    success: false;
    error: any;
};
declare function safeRun<T>(fn: () => T): SafeResult<T>;
declare function safeRunAsync<T>(fn: () => Promise<T>): Promise<SafeResult<T>>;
declare const legacySafeRun: <T>(fn: () => T, defaultValue: T) => T;
export default legacySafeRun;
export { safeRun, safeRunAsync };
