import { h as head, k as attr, c as pop, p as push } from "../../../chunks/index.js";
import "../../../chunks/userdb.js";
function _page($$payload, $$props) {
  push();
  let password = "";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Admin - Sedna AI Gameshow</title>`;
  });
  $$payload.out += `<div class="min-h-screen flex flex-col items-center justify-center bg-sedna-dark-slate-blue p-4">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="bg-white rounded-xl shadow-xl p-8 max-w-md w-full"><h2 class="text-2xl font-retro-bold text-sedna-orange mb-4">Admin Login</h2> <input type="password"${attr("value", password)} class="sedna-input w-full text-xl mb-4" placeholder="Enter admin password..."/> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <button class="sedna-btn sedna-btn-accent w-full">Login</button></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
