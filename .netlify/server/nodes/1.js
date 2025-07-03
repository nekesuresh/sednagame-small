

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.36e60eb1.js","_app/immutable/chunks/252aebef.js","_app/immutable/chunks/f55d0012.js","_app/immutable/chunks/bb423c9a.js","_app/immutable/chunks/2429733d.js","_app/immutable/chunks/766d3a66.js"];
export const stylesheets = [];
export const fonts = [];
