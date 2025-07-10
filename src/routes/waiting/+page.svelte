<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { questionGenerator } from '$lib/utils/QuestionGenerator';
import { answerHandler } from '$lib/utils/AnswerHandler';

let interval: any;
let timeout: any;
let waiting = true;
let showFallback = false;
let fallbackQuestion: any = null;

onMount(() => {
  // Set 30-second timeout
  timeout = setTimeout(() => {
    if (waiting) {
      showFallback = true;
      waiting = false;
      clearInterval(interval);
      
      // Generate a fallback question
      generateFallbackQuestion();
    }
  }, 30000);

  interval = setInterval(() => {
    if (localStorage.getItem('sedna_first_question_preloaded') === 'true') {
      waiting = false;
      clearInterval(interval);
      clearTimeout(timeout);
      goto('/gameshow');
    }
  }, 500);
});

async function generateFallbackQuestion() {
  try {
    const userInfo = answerHandler.getUserInfo();
    const difficulty = userInfo?.difficulty || 'medium';
    
    // Generate a fallback question
    fallbackQuestion = await questionGenerator.generateQuestionFromRandomTip(difficulty);
    
    // Store it as the preloaded question
    localStorage.setItem('sedna_preloaded_question', JSON.stringify(fallbackQuestion));
    localStorage.setItem('sedna_first_question_preloaded', 'true');
    
    // Wait 2 seconds to show the fallback, then redirect
    setTimeout(() => {
      goto('/gameshow');
    }, 2000);
    
  } catch (error) {
    console.error('Error generating fallback question:', error);
    // If fallback generation fails, redirect anyway
    setTimeout(() => {
      goto('/gameshow');
    }, 2000);
  }
}
</script>

<svelte:head>
  <title>Preparing Question - AI or A-Lie</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sedna-cool-blue via-sedna-dark-blue to-sedna-navy p-4">
  <div class="bg-white rounded-xl shadow-xl p-10 flex flex-col items-center">
    {#if waiting}
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sedna-orange mb-6"></div>
      <h2 class="text-2xl font-retro-bold text-sedna-cool-blue mb-2">Preparing your first question…</h2>
      <p class="text-sedna-dark-grey text-lg">This may take a moment. Please wait…</p>
    {:else if showFallback}
      <div class="text-6xl mb-6">⚡</div>
      <h2 class="text-2xl font-retro-bold text-sedna-orange mb-2">Using fallback question…</h2>
      <p class="text-sedna-dark-grey text-lg">Starting your game with a pre-generated question!</p>
      <div class="mt-4 text-sm text-sedna-steel-blue-tint">
        Redirecting to game in 2 seconds...
      </div>
    {/if}
  </div>
</div> 