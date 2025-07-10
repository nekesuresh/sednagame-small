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
	$: cappedProgress = Math.min(progress, 100);
	$: cappedScore = Math.min(stats.score, 100);
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
						<p class="sedna-text"><span class="sedna-highlight">Organization:</span> {userInfo.organization}</p>
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
						<span class="sedna-text">{cappedScore} / 100</span>
					</div>
					<div class="w-full bg-sedna-dark-slate-blue rounded-full h-4 border-2 border-sedna-cool-blue overflow-hidden">
						<div 
							class="bg-gradient-to-r from-sedna-bright-yellow to-sedna-muted-gold h-full rounded-full transition-all duration-500 ease-out" 
							style="width: {cappedProgress}%"
						></div>
					</div>
					<div class="text-center mt-2">
						<span class="sedna-text text-sm">{cappedProgress}% Complete</span>
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
				{#if difficultyLevel === 'AI Champion'}
					<p>🎉 You're ready to help your organization lead with AI.<br/>You think critically about AI's impact and possibilities, and you're eager to guide others through thoughtful adoption. You're ready to lead by example, whether by piloting a tool, sharing a success story, or simply encouraging your team to learn more.<br/>Sedna partners with AI Champions to turn ideas into action and build momentum for sustainable, responsible progress.</p>
				{:else if difficultyLevel === 'AI Ready'}
					<p>🌟 You have a solid foundation and are ready to take the next step.<br/>You have a solid grasp of AI fundamentals and are beginning to apply them in meaningful ways. You're ready to explore practical tools, experiment with intention, and help guide thoughtful next steps for your team.<br/>Sedna can support you in identifying meaningful use cases, experimenting safely, and learning what's working in similar environments.</p>
				{:else}
					<p>📚 You're building your understanding of AI and its potential.<br/>You're aware of AI's role in today's world and are curious about how it can help your organization. This is a great starting point and you're not alone. Many professionals are right here with you. You're ready to explore how AI can enhance your role and improve outcomes.<br/>Sedna is happy to be a thought partner as you begin your journey.</p>
				{/if}
			</div>
		</div>

		<!-- Scroll Hint -->
		<div class="text-center mb-4">
			<p class="text-sm text-sedna-steel-blue-tint italic">
				📜 Scroll down if needed to find the continue game button and keep learning! 🚀
			</p>
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