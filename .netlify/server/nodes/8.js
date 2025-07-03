

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/waiting/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.3d58d5b6.js","_app/immutable/chunks/252aebef.js","_app/immutable/chunks/f55d0012.js","_app/immutable/chunks/bb423c9a.js","_app/immutable/chunks/766d3a66.js","_app/immutable/chunks/2429733d.js"];
export const stylesheets = [];
export const fonts = [];
