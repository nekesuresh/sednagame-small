import { d as slot, c as pop, p as push } from "../../chunks/index.js";
const app = "";
function _layout($$payload, $$props) {
  push();
  $$payload.out += `<div class="min-h-screen bg-gradient-to-br from-retro-slate-darkest via-retro-slate-darker to-retro-slate-dark"><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  pop();
}
export {
  _layout as default
};
