declare const debounce: <T extends (...args: any[]) => any>(fn: T, delay?: number) => T;
export default debounce;
