/**
 * Creates an extended utility object by shallow merging a base object with extensions.
 * Follows SOLID principles: Open/Closed (extensible without modifying base),
 * Single Responsibility (only merges and optionally freezes), DRY (reusable merge logic).
 *
 * @template TBase - The base object type
 * @template TExt - The extension object type
 * @param base - The base object to extend
 * @param ext - Partial extensions to merge into the base
 * @param options - Optional configuration for freezing objects
 * @returns The merged object with base and extensions
 */
function createUtils<
  TBase extends Record<string, any>,
  TExt extends Record<string, any>,
>(
  base: TBase,
  ext: Partial<TExt>,
  options?: { freezeBase?: boolean; freezeResult?: boolean },
): TBase & TExt {
  if (options?.freezeBase) {
    Object.freeze(base);
  }
  const result = { ...base, ...ext };
  if (options?.freezeResult) {
    Object.freeze(result);
  }
  return result as TBase & TExt;
}

export default createUtils;
