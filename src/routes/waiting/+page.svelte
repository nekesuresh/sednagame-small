<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';

let interval: any;
let waiting = true;

onMount(() => {
  interval = setInterval(() => {
    if (localStorage.getItem('sedna_first_question_preloaded') === 'true') {
      waiting = false;
      clearInterval(interval);
      goto('/gameshow');
    }
  }, 500);
});
</script>

<svelte:head>
  <title>Preparing Question - Sedna AI Gameshow</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sedna-cool-blue via-sedna-dark-blue to-sedna-navy p-4">
  <div class="bg-white rounded-xl shadow-xl p-10 flex flex-col items-center">
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sedna-orange mb-6"></div>
    <h2 class="text-2xl font-retro-bold text-sedna-cool-blue mb-2">Preparing your first question…</h2>
    <p class="text-sedna-dark-grey text-lg">This may take a moment. Please wait…</p>
  </div>
</div> 