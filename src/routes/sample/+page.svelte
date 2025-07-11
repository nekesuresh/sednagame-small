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
let showSampleCaseStudy = false;

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
  <title>Sample Question - AI or A-Lie</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-sedna-cool-blue via-sedna-dark-blue to-sedna-navy p-4">
  <div class="max-w-3xl w-full mx-auto bg-white rounded-xl shadow-xl p-6 mt-8">
    <h2 class="text-3xl font-retro-bold text-sedna-orange mb-4 text-center">How to Play</h2>
    
    <!-- Sample Question -->
    <div class="sedna-card mb-6">
      <div class="text-center mb-4">
        <h3 class="text-xl font-retro-bold text-sedna-orange">MYTH OR FACT?</h3>
      </div>
      <div class="bg-sedna-light-grey border-2 border-sedna-cool-blue rounded-lg p-4 mb-4">
        <p class="sedna-text text-lg text-center">
          "AI can completely replace human cybersecurity analysts in detecting threats."
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <button class="sedna-btn text-lg py-3 px-6 opacity-80 cursor-default bg-sedna-pale-blue-grey text-sedna-dark-slate-blue border-sedna-pale-blue-grey">🚫 MYTH</button>
        <button class="sedna-btn sedna-btn-accent text-lg py-3 px-6 opacity-80 cursor-default">✅ FACT</button>
      </div>
      <div class="bg-white border border-sedna-orange rounded-lg p-4 mb-4">
        <div class="font-bold text-sedna-orange mb-2">Answer: <span class="text-sedna-cool-blue">MYTH</span></div>
        <div class="text-gray-700">While AI can assist in threat detection, human analysts are still essential for context and decision-making.</div>
      </div>
      
      <!-- Sedna Tip Section -->
      <div class="bg-sedna-light-grey border-2 border-sedna-orange rounded-lg p-4 mb-4">
        <h4 class="text-xl font-retro-bold text-sedna-orange mb-2">💡 Sedna Did This:</h4>
        <p class="sedna-text mb-3">AI can help, but not fully replace, human experts in cybersecurity.</p>
        <button
          class="sedna-btn sedna-btn-accent text-sm py-2 px-4"
          on:click={() => showSampleCaseStudy = true}
        >
          📚 LEARN MORE
        </button>
      </div>
    </div>

    <!-- Quick Tips -->
    <div class="bg-sedna-pale-blue-grey border-2 border-sedna-cool-blue rounded-lg p-4 mb-6">
      <h4 class="text-xl font-retro-bold text-sedna-cool-blue mb-2">Quick Tips</h4>
      <ul class="list-disc pl-6 text-base space-y-1">
        <li>Reach <strong>100 points</strong> to win</li>
        <li>Use <strong>📊 STATS</strong> to check your progress</li>
        <li>Change difficulty anytime with <strong>⚙️ DIFFICULTY</strong></li>
        <li>Click <strong>🏠 HOME</strong> to restart</li>
      </ul>
    </div>

    <!-- Play Button -->
    <div class="text-center">
      <button
        class="sedna-btn sedna-btn-accent text-2xl py-4 px-10 w-full max-w-xs {questionReady ? 'pulse' : ''}"
        on:click={handlePlayForReal}
        disabled={!questionReady}
      >
        {questionReady ? '🎮 PLAY FOR REAL' : '⏳ Generating question...'}
      </button>
    </div>
  </div>
</div>

{#if showSampleCaseStudy}
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full relative">
      <button class="absolute top-2 right-4 text-3xl text-sedna-dark-grey hover:text-sedna-cool-blue" on:click={() => showSampleCaseStudy = false}>×</button>
      <h3 class="text-2xl font-retro-bold text-sedna-orange mb-4">Case Study</h3>
      <div class="text-sedna-dark-slate-blue text-lg">Sedna helped a national cybersecurity agency stop data leaks using AI, achieving zero malicious exfiltrations for three years.</div>
    </div>
  </div>
{/if} 