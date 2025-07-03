<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { goto } from '$app/navigation';

// Sample fallback question
const sampleQuestion = {
  statement: 'AI can completely replace human cybersecurity analysts in detecting threats.',
  isFact: false,
  explanation: 'While AI can assist in threat detection, human analysts are still essential for context, decision-making, and handling complex scenarios that require human judgment.',
  sednaTip: {
    id: 1,
    tip: 'AI can help, but not fully replace, human experts in cybersecurity.',
    caseStudy: 'Sedna helped a national cybersecurity agency stop data leaks using AI, achieving zero malicious exfiltrations for three years.'
  }
};

let questionReady = false;
let interval: any;

onMount(() => {
  // Poll for preloaded question flag
  interval = setInterval(() => {
    questionReady = localStorage.getItem('sedna_first_question_preloaded') === 'true';
  }, 500);
});

onDestroy(() => {
  clearInterval(interval);
});

function handlePlayForReal() {
  if (questionReady) {
    goto('/gameshow');
  } else {
    goto('/waiting');
  }
}
</script>

<svelte:head>
  <title>How to Play - Sedna AI Gameshow</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sedna-cool-blue via-sedna-dark-blue to-sedna-navy p-4">
  <div class="max-w-3xl w-full bg-white rounded-xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
    <div class="flex-1">
      <h2 class="text-3xl font-retro-bold text-sedna-orange mb-4">How to Play</h2>
      <ul class="space-y-4 text-lg">
        <li class="relative pl-8">
          <span class="absolute left-0 top-0 text-2xl">1️⃣</span>
          Read the question and decide if it is a <span class="font-bold text-sedna-cool-blue">MYTH</span> or <span class="font-bold text-sedna-orange">FACT</span>.
        </li>
        <li class="relative pl-8">
          <span class="absolute left-0 top-0 text-2xl">2️⃣</span>
          Click <span class="font-bold text-sedna-cool-blue">MYTH</span> or <span class="font-bold text-sedna-orange">FACT</span> to answer.
        </li>
        <li class="relative pl-8">
          <span class="absolute left-0 top-0 text-2xl">3️⃣</span>
          See the correct answer, explanation, and a real Sedna tip below.
        </li>
        <li class="relative pl-8">
          <span class="absolute left-0 top-0 text-2xl">4️⃣</span>
          Try to get the highest score! You can change difficulty at any time.
        </li>
      </ul>
      <div class="mt-8">
        <button
          class="sedna-btn sedna-btn-accent text-2xl py-4 px-10 w-full"
          on:click={handlePlayForReal}
          disabled={!questionReady}
        >
          {questionReady ? '🎮 PLAY FOR REAL' : '⏳ Preparing your first question...'}
        </button>
      </div>
    </div>
    <div class="flex-1 flex flex-col items-center">
      <div class="w-full bg-sedna-light-grey border-2 border-sedna-cool-blue rounded-lg p-6 mb-4">
        <h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-2">Sample Question</h3>
        <p class="text-lg mb-4">"{sampleQuestion.statement}"</p>
        <div class="flex gap-4 mb-4">
          <button class="sedna-btn sedna-btn-secondary w-1/2">🚫 MYTH</button>
          <button class="sedna-btn sedna-btn-accent w-1/2">✅ FACT</button>
        </div>
        <div class="bg-white border border-sedna-orange rounded-lg p-4 mb-2">
          <div class="font-bold text-sedna-orange mb-1">Explanation:</div>
          <div class="text-gray-700">{sampleQuestion.explanation}</div>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg">
          <strong class="text-blue-800">💡 Sedna Tip:</strong>
          <div class="text-blue-700 mt-1">{sampleQuestion.sednaTip.tip}</div>
        </div>
      </div>
      <div class="text-center text-sedna-dark-grey text-sm mt-2">
        This is a sample question. When you play for real, your answers will count toward your score!
      </div>
    </div>
  </div>
</div> 