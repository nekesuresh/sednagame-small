<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { answerHandler } from '$lib/utils/AnswerHandler';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}

	function handleReset() {
		dispatch('reset');
		handleClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}

	$: stats = answerHandler.getStats();
	$: encouragement = answerHandler.getEncouragement();
	$: difficultyLevel = answerHandler.getDifficultyLevel();
	$: userInfo = answerHandler.getUserInfo();
	$: progress = answerHandler.getProgress();
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
					📊 YOUR STATISTICS
				</h2>
			</div>
			<button
				class="text-4xl text-sedna-dark-grey hover:text-sedna-cool-blue transition-colors"
				on:click={handleClose}
			>
				×
			</button>
		</div>

		<!-- User Info -->
		{#if userInfo}
			<div class="bg-sedna-light-grey border-2 border-sedna-cool-blue rounded-lg p-6 mb-6">
				<h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-3">
					👤 Player Profile
				</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<p class="sedna-text"><span class="sedna-highlight">Name:</span> {userInfo.name}</p>
						<p class="sedna-text"><span class="sedna-highlight">Occupation:</span> {userInfo.occupation}</p>
					</div>
					<div>
						<p class="sedna-text"><span class="sedna-highlight">AI Concern:</span> {userInfo.aiConcern}</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Stats Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
			<!-- Score -->
			<div class="bg-sedna-light-grey border-2 border-sedna-orange rounded-lg p-6 text-center">
				<div class="text-4xl mb-2">🏆</div>
				<h3 class="text-xl font-retro-bold text-sedna-orange mb-2">Total Score</h3>
				<div class="text-3xl font-retro-bold text-sedna-orange">{stats.score}</div>
			</div>

			<!-- Accuracy -->
			<div class="bg-sedna-light-grey border-2 border-sedna-cool-blue rounded-lg p-6 text-center">
				<div class="text-4xl mb-2">🎯</div>
				<h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-2">Accuracy</h3>
				<div class="text-3xl font-retro-bold text-sedna-cool-blue">{stats.accuracy}%</div>
			</div>

			<!-- Questions Answered -->
			<div class="bg-sedna-light-grey border-2 border-sedna-navy rounded-lg p-6 text-center">
				<div class="text-4xl mb-2">❓</div>
				<h3 class="text-xl font-retro-bold text-sedna-navy mb-2">Questions</h3>
				<div class="text-3xl font-retro-bold text-sedna-navy">{stats.totalQuestions}</div>
			</div>
		</div>

		<!-- Progress Bar -->
		<div class="bg-sedna-light-grey border-2 border-sedna-cool-blue rounded-lg p-6 mb-6">
			<h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-3">
				📈 Progress Overview
			</h3>
			<div class="space-y-4">
				<div>
					<div class="flex justify-between mb-2">
						<span class="sedna-text">Score Progress</span>
						<span class="sedna-text">{stats.score} / 100</span>
					</div>
					<div class="w-full bg-sedna-dark-slate-blue rounded-full h-4 border-2 border-sedna-cool-blue overflow-hidden">
						<div 
							class="bg-gradient-to-r from-sedna-bright-yellow to-sedna-muted-gold h-full rounded-full transition-all duration-500 ease-out" 
							style="width: {progress}%"
						></div>
					</div>
					<div class="text-center mt-2">
						<span class="sedna-text text-sm">{progress}% Complete</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Encouragement -->
		<div class="bg-sedna-light-grey border-2 border-sedna-orange rounded-lg p-6 mb-6">
			<h3 class="text-xl font-retro-bold text-sedna-orange mb-3">
				💪 Your Performance
			</h3>
			<p class="sedna-text text-lg">
				{encouragement}
			</p>
		</div>

		<!-- Difficulty Level Info -->
		<div class="bg-sedna-light-grey border-2 border-sedna-cool-blue rounded-lg p-6 mb-6">
			<h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-3">
				🏅 Your Level: {difficultyLevel}
			</h3>
			<div class="sedna-text space-y-2">
				{#if difficultyLevel === 'Expert'}
					<p>🎉 You're an AI expert! Outstanding knowledge and understanding.</p>
				{:else if difficultyLevel === 'Advanced'}
					<p>🌟 Excellent work! You have strong AI knowledge and are learning fast.</p>
				{:else if difficultyLevel === 'Intermediate'}
					<p>💪 Great progress! You're building solid AI understanding.</p>
				{:else}
					<p>📚 Keep learning! Every question helps you understand AI better.</p>
				{/if}
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex justify-center space-x-4">
			<button
				class="sedna-btn sedna-btn-accent"
				on:click={handleClose}
			>
				🎯 CONTINUE GAME
			</button>
			<button
				class="sedna-btn sedna-btn-secondary"
				on:click={handleReset}
			>
				🔄 RESET STATS
			</button>
		</div>
	</div>
</div> 