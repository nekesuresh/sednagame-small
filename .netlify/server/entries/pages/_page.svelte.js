import { f as ensure_array_like, h as head, i as attr_style, j as stringify, e as escape_html, c as pop, p as push } from "../../chunks/index.js";
import "../../chunks/client.js";
import "../../chunks/AnswerHandler.js";
const _page_svelte_svelte_type_style_lang = "";
function _page($$payload, $$props) {
  push();
  const fontSize = 28;
  let columns = [];
  const each_array = ensure_array_like(columns);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Sedna AI Gameshow - Welcome</title>`;
  });
  $$payload.out += `<div class="page-container svelte-qe6gge"><div class="matrix-rain svelte-qe6gge"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let col = each_array[$$index_1];
    const each_array_1 = ensure_array_like(col.trail);
    $$payload.out += `<div class="matrix-col svelte-qe6gge"${attr_style(`left: ${stringify(col.x)}px; top: 0; height: 100vh;`)}><!--[-->`;
    for (let j = 0, $$length2 = each_array_1.length; j < $$length2; j++) {
      let char = each_array_1[j];
      $$payload.out += `<span class="matrix-char svelte-qe6gge"${attr_style(` color: ${stringify(col.color)}; opacity: ${stringify(Math.max(0.1, 1 - (col.trail.length - j) / col.trail.length))}; transform: translateY(${stringify(col.y - (col.trail.length - j) * fontSize)}px); `)}>${escape_html(char)}</span>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="header-content svelte-qe6gge"><div class="text-8xl mb-6 svelte-qe6gge">🎮</div> <h1 class="text-5xl md:text-7xl font-retro-bold text-sedna-orange mb-4 svelte-qe6gge">SEDNA AI GAMESHOW</h1> <p class="text-2xl md:text-3xl font-retro text-sedna-dark-blue mb-8 svelte-qe6gge">Test Your AI Knowledge!</p> <button class="start-button svelte-qe6gge">Start Game</button></div></div> <div class="min-h-screen bg-gradient-to-br from-sedna-cool-blue via-sedna-dark-blue to-sedna-navy flex items-center justify-center p-4 svelte-qe6gge"><div class="max-w-4xl mx-auto text-center svelte-qe6gge"><div class="mb-12 svelte-qe6gge"><div class="text-8xl mb-6 svelte-qe6gge">🎮</div> <h1 class="text-5xl md:text-7xl font-retro-bold text-sedna-orange mb-4 svelte-qe6gge">SEDNA AI GAMESHOW</h1> <p class="text-2xl md:text-3xl font-retro text-sedna-light-grey mb-8 svelte-qe6gge">Test Your AI Knowledge!</p></div> <div class="sedna-card mb-12 svelte-qe6gge"><div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 svelte-qe6gge"><div class="text-center svelte-qe6gge"><div class="text-4xl mb-4 svelte-qe6gge">🤖</div> <h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-2 svelte-qe6gge">AI Myths vs Facts</h3> <p class="sedna-text svelte-qe6gge">Separate AI fiction from reality with our interactive quiz</p></div> <div class="text-center svelte-qe6gge"><div class="text-4xl mb-4 svelte-qe6gge">🏆</div> <h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-2 svelte-qe6gge">Earn Points</h3> <p class="sedna-text svelte-qe6gge">Score points and track your progress as you learn</p></div> <div class="text-center svelte-qe6gge"><div class="text-4xl mb-4 svelte-qe6gge">💡</div> <h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-2 svelte-qe6gge">Learn from Sedna</h3> <p class="sedna-text svelte-qe6gge">Discover real AI success stories from government projects</p></div></div></div> <div class="mb-8 svelte-qe6gge"><button class="sedna-btn sedna-btn-accent text-4xl md:text-5xl py-8 px-16 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 svelte-qe6gge">🎯 START GAME</button></div> <div class="text-center svelte-qe6gge"><p class="sedna-text text-sedna-dark-grey svelte-qe6gge">Powered by <span class="sedna-highlight svelte-qe6gge">Sedna Consulting Group</span></p> <p class="sedna-text text-sedna-dark-grey text-sm mt-2 svelte-qe6gge">Offline AI-powered learning experience</p></div></div></div>`;
  pop();
}
export {
  _page as default
};
