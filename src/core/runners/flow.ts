import UtilifyException from "../exception-handler";

/**
 * Composes multiple functions into a single pipeline, applying them sequentially from left to right.
 * Each function receives the output of the previous function as its input.
 *
 * @template A - Input type of the first function
 * @template B - Output type of the first function / Input type of the second function
 * @template C - Output type of the second function / Input type of the third function (optional)
 * @template D - Output type of the third function / Input type of the fourth function (optional)
 * @template E - Output type of the fourth function / Input type of the fifth function (optional)
 * @template F - Output type of the fifth function / Input type of the sixth function (optional)
 * @template G - Output type of the sixth function / Input type of the seventh function (optional)
 * @template H - Output type of the seventh function / Input type of the eighth function (optional)
 * @template I - Output type of the eighth function / Input type of the ninth function (optional)
 * @template J - Output type of the ninth function / Input type of the tenth function (optional)
 * @template K - Output type of the tenth function
 * @param f1 - First function in the pipeline
 * @param f2 - Second function in the pipeline
 * @param f3 - Third function in the pipeline (optional)
 * @param f4 - Fourth function in the pipeline (optional)
 * @param f5 - Fifth function in the pipeline (optional)
 * @param f6 - Sixth function in the pipeline (optional)
 * @param f7 - Seventh function in the pipeline (optional)
 * @param f8 - Eighth function in the pipeline (optional)
 * @param f9 - Ninth function in the pipeline (optional)
 * @param f10 - Tenth function in the pipeline (optional)
 * @returns A function that takes the initial input and applies all functions in sequence
 * @throws UtilifyException if fewer than 2 functions are provided
 *
 * @example
 * // String processing pipeline
 * const processString = flow(
 *   (s: string) => s.trim(),
 *   (s: string) => s.toUpperCase(),
 *   (s: string) => `PREFIX_${s}`
 * );
 * console.log(processString("  hello world  ")); // "PREFIX_HELLO WORLD"
 *
 * @example
 * // Number math pipeline
 * const processNumber = flow(
 *   (n: number) => n + 1,
 *   (n: number) => n * n,
 *   (n: number) => n / 2
 * );
 * console.log(processNumber(3)); // ((3 + 1)²) / 2 = 8
 */
function flow<A, B>(f1: (a: A) => B, f2: (b: B) => any): (input: A) => any;
function flow<A, B, C>(
  f1: (a: A) => B,
  f2: (b: B) => C,
  f3: (c: C) => any,
): (input: A) => any;
function flow<A, B, C, D>(
  f1: (a: A) => B,
  f2: (b: B) => C,
  f3: (c: C) => D,
  f4: (d: D) => any,
): (input: A) => any;
function flow<A, B, C, D, E>(
  f1: (a: A) => B,
  f2: (b: B) => C,
  f3: (c: C) => D,
  f4: (d: D) => E,
  f5: (e: E) => any,
): (input: A) => any;
function flow<A, B, C, D, E, F>(
  f1: (a: A) => B,
  f2: (b: B) => C,
  f3: (c: C) => D,
  f4: (d: D) => E,
  f5: (e: E) => F,
  f6: (f: F) => any,
): (input: A) => any;
function flow<A, B, C, D, E, F, G>(
  f1: (a: A) => B,
  f2: (b: B) => C,
  f3: (c: C) => D,
  f4: (d: D) => E,
  f5: (e: E) => F,
  f6: (f: F) => G,
  f7: (g: G) => any,
): (input: A) => any;
function flow<A, B, C, D, E, F, G, H>(
  f1: (a: A) => B,
  f2: (b: B) => C,
  f3: (c: C) => D,
  f4: (d: D) => E,
  f5: (e: E) => F,
  f6: (f: F) => G,
  f7: (g: G) => H,
  f8: (h: H) => any,
): (input: A) => any;
function flow<A, B, C, D, E, F, G, H, I>(
  f1: (a: A) => B,
  f2: (b: B) => C,
  f3: (c: C) => D,
  f4: (d: D) => E,
  f5: (e: E) => F,
  f6: (f: F) => G,
  f7: (g: G) => H,
  f8: (h: H) => I,
  f9: (i: I) => any,
): (input: A) => any;
function flow<A, B, C, D, E, F, G, H, I, J>(
  f1: (a: A) => B,
  f2: (b: B) => C,
  f3: (c: C) => D,
  f4: (d: D) => E,
  f5: (e: E) => F,
  f6: (f: F) => G,
  f7: (g: G) => H,
  f8: (h: H) => I,
  f9: (i: I) => J,
  f10: (j: J) => any,
): (input: A) => any;
function flow(...fns: Array<(input: any) => any>): (input: any) => any {
  if (fns.length < 2) {
    throw new UtilifyException("flow", "At least 2 functions are required");
  }

  // Validate that all arguments are functions
  for (let i = 0; i < fns.length; i++) {
    if (typeof fns[i] !== "function") {
      throw new UtilifyException(
        "flow",
        `Argument at index ${i} is not a function`,
      );
    }
  }

  return (input: any) => fns.reduce((acc, fn) => fn(acc), input);
}

export default flow;
