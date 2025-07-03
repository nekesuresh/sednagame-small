import { h as head, e as escape_html, c as pop, p as push } from "../../../chunks/index.js";
import "../../../chunks/client.js";
import { a as answerHandler } from "../../../chunks/AnswerHandler.js";
import "canvas-confetti";
function _page($$payload, $$props) {
  push();
  let currentDifficulty;
  let didYouKnowFacts = [
    "Did you know? AI can write an entire book, but it might still struggle to tell you the difference between a banana and an apple in a photo.",
    "Did you know? AI can predict the weather with impressive accuracy, but it still can't predict when your internet will cut out mid-stream.",
    "Did you know? AI can beat the world champion at chess, but it gets completely confused if you ask it to count the number of strawberries in a basket of three.",
    "Did you know? AI can generate complex art that looks just like a famous painter's style, but it still can't figure out how to make a decent cup of coffee!",
    "Did you know? AI has been trained to help doctors diagnose diseases, but it can't tell if a dog is excited or just really tired based on its wagging tail.",
    "Did you know? AI can help design skyscrapers and build bridges, but it might still get tripped up trying to fold a fitted sheet properly.",
    "Did you know? AI can predict traffic patterns and optimize city routes, but it might still get lost in your own driveway!",
    "Did you know? AI can write music in Beethoven's style, but it can't understand the concept of a 'bad hair day.'",
    "Did you know? AI can teach itself to play video games, but it still has trouble figuring out how to open a jar of pickles.",
    "Did you know? AI can analyze vast amounts of medical data, but it can't quite grasp why we keep talking to our pets like they're human."
  ];
  let currentFactIndex = Math.floor(Math.random() * didYouKnowFacts.length);
  answerHandler.getScore();
  answerHandler.getAccuracy();
  currentDifficulty = answerHandler.getUserInfo()?.difficulty?.toUpperCase() || "MEDIUM";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Gameshow - Sedna AI Gameshow</title>`;
  });
  $$payload.out += `<div class="sedna-section-bg min-h-screen relative"><div class="crt-overlay pointer-events-none"></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20"><div class="flex justify-center items-center mb-8"><div class="flex items-center space-x-4"><button class="sedna-btn sedna-btn-secondary">🏠 HOME</button> <button class="sedna-btn">📊 STATS</button> <button class="sedna-btn sedna-btn-accent">⚙️ DIFFICULTY</button> <div class="ml-4 sedna-badge sedna-badge-secondary text-lg">Level: ${escape_html(currentDifficulty)}</div></div></div> <div class="max-w-4xl mx-auto">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="sedna-card text-center py-16"><div class="text-6xl mb-6">🤖</div> <h2 class="text-3xl font-retro-bold text-sedna-cool-blue mb-4">Generating AI Question...</h2> <p class="sedna-text">${escape_html("Using pre-generated questions...")}</p> <div class="mt-8"><h3 class="text-xl font-retro-bold text-sedna-orange mb-4">While you wait, here's a fun fact:</h3> <ul class="text-lg text-sedna-steel-blue-tint max-w-xl mx-auto"><li>${escape_html(didYouKnowFacts[currentFactIndex])}</li></ul></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="text-center mt-12"><p class="sedna-text text-sedna-dark-grey">Powered by <span class="sedna-highlight">Sedna Consulting Group</span></p></div></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
