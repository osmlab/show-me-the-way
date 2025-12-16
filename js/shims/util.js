// Minimal util shim for lru-cache v4 (only uses util.inspect.custom)
export const inspect = { custom: Symbol('util.inspect.custom') };
export default { inspect };

