declare function createUtils<TBase extends Record<string, any>, TExt extends Record<string, any>>(base: TBase, ext: Partial<TExt>, options?: {
    freezeBase?: boolean;
    freezeResult?: boolean;
}): TBase & TExt;
export default createUtils;
