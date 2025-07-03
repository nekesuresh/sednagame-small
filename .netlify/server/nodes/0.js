import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.7bf0b717.js","_app/immutable/chunks/252aebef.js","_app/immutable/chunks/f55d0012.js","_app/immutable/chunks/bb423c9a.js","_app/immutable/chunks/766d3a66.js"];
export const stylesheets = ["_app/immutable/assets/0.46ed1c5e.css"];
export const fonts = [];
