<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { AnswerResult } from '$lib/utils/AnswerHandler';

	export let answerResult: AnswerResult;

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Modal Backdrop -->
<div class="sedna-modal" on:click={handleClose}>
	<!-- Modal Content -->
	<div class="sedna-modal-content" on:click|stopPropagation>
		<!-- Header -->
		<div class="flex justify-between items-start mb-6">
			<div>
				<h2 class="text-3xl md:text-4xl font-retro-bold text-sedna-cool-blue mb-2">
					📚 SEDNA CASE STUDY
				</h2>
			</div>
			<button
				class="text-4xl text-sedna-dark-grey hover:text-sedna-cool-blue transition-colors"
				on:click={handleClose}
			>
				×
			</button>
		</div>

		<!-- Content -->
		<div class="space-y-6">
			<!-- Sedna Tip -->
			<div class="bg-sedna-light-grey border-2 border-sedna-orange rounded-lg p-6">
				<h3 class="text-xl font-retro-bold text-sedna-orange mb-3">
					💡 What Sedna Accomplished:
				</h3>
				<p class="sedna-text text-lg">
					{answerResult.sednaTip}
				</p>
			</div>

			<!-- Full Case Study -->
			<div class="bg-sedna-light-grey border-2 border-sedna-cool-blue rounded-lg p-6">
				<h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-3">
					📖 Full Case Study:
				</h3>
				<div class="sedna-text text-lg leading-relaxed">
					{answerResult.caseStudy}
				</div>
			</div>


		</div> 

		<!-- Action Buttons -->
		<div class="flex justify-center mt-8 space-x-4">
			<button
				class="sedna-btn sedna-btn-accent"
				on:click={handleClose}
			>
				🎯 CONTINUE GAME
			</button>
		</div>
	</div>
</div>  -->