<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { answerHandler } from '$lib/utils/AnswerHandler';
	import { usedQuestionIds } from '$lib/stores/usedQuestionIds';

	let userInfo: any = null;

	onMount(() => {
		userInfo = answerHandler.getUserInfo();
		const endGamePressed = localStorage.getItem('sedna_end_game_pressed') === 'true';
		if (!userInfo || (answerHandler.getScore() < 100 && !endGamePressed)) {
			goto('/');
		} else if (endGamePressed) {
			// Clear the flag so user can't revisit freely
			localStorage.removeItem('sedna_end_game_pressed');
		}
	});

	function handlePlayAgain() {
		answerHandler.resetStats();
		usedQuestionIds.set(new Set());
		goto('/');
	}

	function handleBackToHome() {
		goto('/');
	}

	const levelDescriptions = {
		"AI Champion": `You’re ready to help your organization lead with AI.\nYou think critically about AI's impact and possibilities, and you're eager to guide others through thoughtful adoption. You're ready to lead by example, whether by piloting a tool, sharing a success story, or simply encouraging your team to learn more.\nSedna partners with AI Champions to turn ideas into action and build momentum for sustainable, responsible progress.`,
		"AI Ready": `You have a solid foundation and are ready to take the next step.\nYou have a solid grasp of AI fundamentals and are beginning to apply them in meaningful ways. You’re ready to explore practical tools, experiment with intention, and help guide thoughtful next steps for your team.\nSedna can support you in identifying meaningful use cases, experimenting safely, and learning what’s working in similar environments.`,
		"AI Aware": `You're building your understanding of AI and its potential.\nYou’re aware of AI’s role in today’s world and are curious about how it can help your organization. This is a great starting point and you're not alone. Many professionals are right here with you. You're ready to explore how AI can enhance your role and improve outcomes.\nSedna is happy to be a thought partner as you begin your journey.`
	};

	function getLevelDescription() {
		const level = answerHandler.getDifficultyLevel();
		return levelDescriptions[level] || answerHandler.getEncouragement();
	}
</script>

<svelte:head>
	<title>Game Complete - AI or A-Lie</title>
</svelte:head>

<div class="sedna-section-bg min-h-screen">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
		<div class="text-center">
			<!-- Celebration Animation -->
			<div class="text-8xl mb-6 animate-bounce-slow">🎉</div>
			
			<!-- Main Title -->
			<h1 class="text-5xl md:text-7xl font-retro-bold text-sedna-bright-yellow mb-8 bg-sedna-dark-slate-blue px-8 py-4 rounded-lg shadow-lg">
				YOU'RE AI READY!
			</h1>

			<!-- Congratulations Card -->
			<div class="sedna-card mb-8">
				<h2 class="text-3xl font-retro-bold text-sedna-dark-slate-blue mb-4">
					🏆 Congratulations, {userInfo?.name || 'Champion'}!
				</h2>
				{#if userInfo?.title}
					<p class="sedna-text text-lg text-sedna-steel-blue-tint mb-4">
						{userInfo.title} at {userInfo?.organization || 'your organization'}
					</p>
				{/if}
				<p class="sedna-text text-xl mb-6">
					You've successfully completed AI or A-Lie and demonstrated your understanding of AI in government and public sector applications!
				</p>
				
				<!-- Final Stats -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<div class="bg-sedna-light-grey border-2 border-sedna-cool-blue rounded-lg p-6">
						<div class="text-2xl font-retro-bold text-sedna-cool-blue mb-2">🏆 Final Score</div>
						<div class="text-4xl font-retro-bold text-sedna-dark-slate-blue">{answerHandler.getScore()}</div>
					</div>
					<div class="bg-sedna-light-grey border-2 border-sedna-orange rounded-lg p-6">
						<div class="text-2xl font-retro-bold text-sedna-orange mb-2">🎯 Accuracy</div>
						<div class="text-4xl font-retro-bold text-sedna-dark-slate-blue">{answerHandler.getAccuracy()}%</div>
					</div>
					<div class="bg-sedna-light-grey border-2 border-sedna-bright-yellow rounded-lg p-6">
						<div class="text-2xl font-retro-bold text-sedna-bright-yellow mb-2">📊 Questions</div>
						<div class="text-4xl font-retro-bold text-sedna-dark-slate-blue">{userInfo?.totalQuestions || 0}</div>
					</div>
				</div>

				<!-- Performance Level -->
				<div class="bg-sedna-light-grey border-2 border-sedna-muted-gold rounded-lg p-6">
					<h3 class="text-2xl font-retro-bold text-sedna-muted-gold mb-3">
						🌟 Your Performance Level: {answerHandler.getDifficultyLevel()}
					</h3>
					<p class="sedna-text">
						{getLevelDescription()}
					</p>
				</div>
			</div>

			<!-- Swag Collection Card -->
			<div class="sedna-card border-2 border-sedna-bright-yellow bg-gradient-to-r from-sedna-bright-yellow to-sedna-muted-gold mb-8">
				<div class="text-6xl mb-4">🎁</div>
				<h2 class="text-3xl md:text-4xl font-retro-bold text-white mb-4">
					You’re entered into the AirPod Raffle — Spin the wheel for a chance at bonus entries!

				</h2>
				<p class="text-white text-xl font-sedna-bold text-center">
					Winner will be announced soon. Stay tuned!
				</p>
			</div>

			<!-- Action Buttons -->
			<div class="flex justify-center">
				<button
					class="sedna-btn sedna-btn-accent text-2xl py-6 px-12"
					on:click={handlePlayAgain}
				>
					🔄 PLAY AGAIN
				</button>
			</div>

			<!-- Sedna Branding -->
			<div class="mt-12">
				<p class="sedna-text text-sedna-steel-blue-tint">
					Powered by <span class="sedna-highlight">Sedna Consulting Group</span>
				</p>
			</div>
		</div>
	</div>
</div> 