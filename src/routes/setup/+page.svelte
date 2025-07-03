<script lang="ts">
	import { goto } from '$app/navigation';
	import { answerHandler } from '$lib/utils/AnswerHandler';
	import { questionGenerator } from '$lib/utils/QuestionGenerator';
	import { saveUserInfo } from '$lib/utils/userdb';

	let name = '';
	let occupation = '';
	let aiConcern = '';
	let difficulty: 'easy' | 'medium' | 'hard' | '' = '';
	let isSubmitting = false;
	let isPreloading = false;
	let questionPreloaded = false;
	let phone = '';
	let email = '';

	const occupations = [
		'Government Employee',
		'IT Professional',
		'Manager/Executive',
		'Student',
		'Consultant',
		'Healthcare Worker',
		'Educator',
		'Other'
	];

	const aiConcerns = [
		'Privacy and Data Security',
		'Job Displacement',
		'Bias and Fairness',
		'Cost and Implementation',
		'Technical Complexity',
		'Regulatory Compliance',
		'None - Just Curious',
		'Other'
	];

	// Reactive statement to generate question when difficulty changes
	$: if (difficulty && !questionPreloaded && !isPreloading) {
		handleDifficultyChange(difficulty);
	}

	async function handleDifficultyChange(newDifficulty: 'easy' | 'medium' | 'hard') {
		isPreloading = true;
		try {
			const preloadedQuestion = await questionGenerator.generateQuestionFromRandomTip(newDifficulty);
			questionPreloaded = true;
			localStorage.setItem('sedna_first_question_preloaded', 'true');
			localStorage.setItem('sedna_preloaded_question', JSON.stringify(preloadedQuestion));
		} catch (e) {
			console.error('Error preloading first question:', e);
		} finally {
			isPreloading = false;
		}
	}

	async function handleSubmit() {
		if (!name.trim() || !occupation.trim() || !aiConcern.trim() || !difficulty || !phone.trim() || !email.trim()) {
			alert('Please fill in all fields');
			return;
		}

		isSubmitting = true;

		try {
			await saveUserInfo({ name: name.trim(), painPoint: aiConcern.trim(), occupation: occupation.trim(), phone: phone.trim(), email: email.trim() });
			answerHandler.initializeUserInfo(name.trim(), occupation.trim(), aiConcern.trim(), difficulty as 'easy' | 'medium' | 'hard');
			localStorage.removeItem('sedna_show_start_page');
			goto('/sample');
		} catch (error) {
			console.error('Error setting up user:', error);
			alert('Error setting up user. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Setup - Sedna AI Gameshow</title>
</svelte:head>

<div class="sedna-section-bg min-h-screen">
	<div class="max-w-2xl mx-auto py-12 md:py-16 lg:py-20">
		<div class="text-center mb-12">
			<h1 class="sedna-header mb-6">
				🎮 PLAYER SETUP
			</h1>
			<p class="sedna-subheader">
				Tell us about yourself to personalize your AI learning experience
			</p>
		</div>
		<div class="sedna-card">
			<form on:submit|preventDefault={handleSubmit} class="space-y-8">
				<!-- Difficulty selection FIRST -->
				<div>
					<label class="block text-xl font-retro-bold text-sedna-navy mb-3">
						🎯 Choose your difficulty level:
					</label>
					<p class="text-sm text-sedna-steel-blue-tint mb-4 text-center">
						💡 Don't worry, you can change this later in the game!
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<label class="block {difficulty ? 'cursor-not-allowed' : 'cursor-pointer'}">
							<input
								type="radio"
								bind:group={difficulty}
								value="easy"
								class="sr-only"
								disabled={difficulty}
							/>
							<div class="bg-white border-2 rounded-xl p-4 text-center transition-all duration-200 {difficulty === 'easy' ? 'border-sedna-bright-yellow bg-sedna-pale-blue-grey shadow-lg' : 'border-sedna-dark-slate-blue'} {difficulty ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:border-sedna-bright-yellow cursor-pointer'}">
								<div class="text-3xl mb-2">🌱</div>
								<div class="font-retro-bold text-lg text-sedna-dark-slate-blue">EASY</div>
								<div class="text-sm text-sedna-steel-blue-tint">Basic concepts</div>
								<div class="text-xs text-sedna-bright-yellow mt-1 font-bold">10 pts</div>
							</div>
						</label>
						<label class="block {difficulty ? 'cursor-not-allowed' : 'cursor-pointer'}">
							<input
								type="radio"
								bind:group={difficulty}
								value="medium"
								class="sr-only"
								disabled={difficulty}
							/>
							<div class="bg-white border-2 rounded-xl p-4 text-center transition-all duration-200 {difficulty === 'medium' ? 'border-sedna-bright-yellow bg-sedna-pale-blue-grey shadow-lg' : 'border-sedna-dark-slate-blue'} {difficulty ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:border-sedna-bright-yellow cursor-pointer'}">
								<div class="text-3xl mb-2">🎯</div>
								<div class="font-retro-bold text-lg text-sedna-dark-slate-blue">MEDIUM</div>
								<div class="text-sm text-sedna-steel-blue-tint">Moderate complexity</div>
								<div class="text-xs text-sedna-bright-yellow mt-1 font-bold">20 pts</div>
							</div>
						</label>
						<label class="block {difficulty ? 'cursor-not-allowed' : 'cursor-pointer'}">
							<input
								type="radio"
								bind:group={difficulty}
								value="hard"
								class="sr-only"
								disabled={difficulty}
							/>
							<div class="bg-white border-2 rounded-xl p-4 text-center transition-all duration-200 {difficulty === 'hard' ? 'border-sedna-bright-yellow bg-sedna-pale-blue-grey shadow-lg' : 'border-sedna-dark-slate-blue'} {difficulty ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:border-sedna-bright-yellow cursor-pointer'}">
								<div class="text-3xl mb-2">🔥</div>
								<div class="font-retro-bold text-lg text-sedna-dark-slate-blue">HARD</div>
								<div class="text-sm text-sedna-steel-blue-tint">Advanced concepts</div>
								<div class="text-xs text-sedna-bright-yellow mt-1 font-bold">30 pts</div>
							</div>
						</label>
					</div>
					{#if isPreloading}
						<div class="mt-2 text-center">
							<p class="sedna-text text-sedna-dark-grey text-sm">
								⚡ Generating your first question for this difficulty...
							</p>
						</div>
					{/if}
				</div>
				<!-- Player name input NEXT -->
				<div>
					<label for="name" class="block text-xl font-retro-bold text-sedna-navy mb-3">
						👤 What's your name?
					</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						class="sedna-input w-full text-xl"
						placeholder="Enter your name..."
						required
						autocomplete="name"
					/>
				</div>
				<div>
					<label for="occupation" class="block text-xl font-retro-bold text-sedna-navy mb-3">
						💼 What's your occupation?
					</label>
					<input
						id="occupation"
						type="text"
						bind:value={occupation}
						class="sedna-input w-full text-xl"
						placeholder="Enter your occupation..."
						required
					/>
				</div>
				<div>
					<label for="aiConcern" class="block text-xl font-retro-bold text-sedna-navy mb-3">
						🤔 What's your biggest concern about AI?
					</label>
					<input
						id="aiConcern"
						type="text"
						bind:value={aiConcern}
						class="sedna-input w-full text-xl"
						placeholder="Enter your main concern about AI..."
						required
					/>
				</div>
				<div>
					<label for="phone" class="block text-xl font-retro-bold text-sedna-navy mb-3">
						📱 Phone Number
					</label>
					<input
						id="phone"
						type="tel"
						bind:value={phone}
						class="sedna-input w-full text-xl"
						placeholder="Enter your phone number..."
						required
						autocomplete="tel"
					/>
				</div>
				<div>
					<label for="email" class="block text-xl font-retro-bold text-sedna-navy mb-3">
						✉️ Email Address
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						class="sedna-input w-full text-xl"
						placeholder="Enter your email address..."
						required
						autocomplete="email"
					/>
				</div>
				<div class="text-center pt-6">
					<button
						type="submit"
						class="sedna-btn sedna-btn-accent text-2xl py-6 px-12"
						disabled={isSubmitting}
					>
						{isSubmitting ? '🚀 SETTING UP...' : '🚀 START GAME'}
					</button>
				</div>
			</form>
		</div>
	</div>
</div> 