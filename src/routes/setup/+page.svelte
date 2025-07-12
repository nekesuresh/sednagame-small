<script lang="ts">
	import { goto } from '$app/navigation';
	import { answerHandler } from '$lib/utils/AnswerHandler';
	import { questionGenerator } from '$lib/utils/QuestionGenerator';
	import { saveUserInfo } from '$lib/utils/userdb';

	let name = '';
	let title = '';
	let organization = '';
	let aiConcern = '';
	let difficulty: 'easy' | 'medium' | 'hard' | '' = '';
	let isSubmitting = false;
	let isPreloading = false;
	let questionPreloaded = false;
	let phone = '';
	let email = '';
	let state = '';

	const organizations = [
		'Government Agency',
		'IT Company',
		'Consulting Firm',
		'Healthcare Organization',
		'Educational Institution',
		'Nonprofit',
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
	
	// Preload medium difficulty question by default if no difficulty is selected
	$: if (!difficulty && !questionPreloaded && !isPreloading) {
		handleDifficultyChange('medium');
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
		if (!name.trim() || !title.trim() || !organization.trim() || !aiConcern.trim() || !phone.trim() || !email.trim() || !state.trim()) {
			alert('Please fill in all fields');
			return;
		}

		// Default to medium if no difficulty is selected
		const selectedDifficulty = difficulty || 'medium';

		isSubmitting = true;

		try {
			await saveUserInfo({ name: name.trim(), title: title.trim(), painPoint: aiConcern.trim(), organization: organization.trim(), phone: phone.trim(), email: email.trim(), state: state.trim() });
			answerHandler.initializeUserInfo(name.trim(), organization.trim(), aiConcern.trim(), selectedDifficulty as 'easy' | 'medium' | 'hard');
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
	<title>Setup - AI or A-Lie</title>
</svelte:head>

<div class="sedna-section-bg min-h-screen overflow-y-auto flex items-center justify-center">
	<div class="w-full max-w-lg mx-auto py-8">
		<div class="text-center mb-8">
			<h1 class="sedna-header mb-4 flex items-center justify-center gap-3 whitespace-nowrap text-3xl md:text-4xl lg:text-5xl">
				<span>🎮</span>
				<span>PLAYER SETUP</span>
			</h1>
			<p class="sedna-subheader">
				Tell us about yourself to personalize your AI learning experience
			</p>
		</div>
		<div class="sedna-card p-6">
			<form on:submit|preventDefault={handleSubmit} class="space-y-5">
				<!-- Difficulty selection FIRST -->
				<div>
					<label class="block text-xl font-retro-bold text-sedna-navy mb-3">
						🎯 Choose your difficulty level (optional):
					</label>
					<p class="text-sm text-sedna-steel-blue-tint mb-4 text-center">
						💡 Medium is selected by default if you don't choose. You can change this later in the game!
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
								<div class="text-xs text-sedna-bright-yellow mt-1 font-bold">20 pts</div>
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
								<div class="text-xs text-sedna-bright-yellow mt-1 font-bold">25 pts</div>
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
								<div class="text-sm text-sedna-steel-blue-tint">Challenging questions</div>
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
					<label for="title" class="block text-xl font-retro-bold text-sedna-navy mb-3">
						🏷️ What's your title?
					</label>
					<input
						id="title"
						type="text"
						bind:value={title}
						class="sedna-input w-full text-xl"
						placeholder="Enter your title (e.g., Analyst, Director, etc.)..."
						required
					/>
				</div>
				<div>
					<label for="organization" class="block text-xl font-retro-bold text-sedna-navy mb-3">
						🏢 What's your organization?
					</label>
					<input
						id="organization"
						type="text"
						bind:value={organization}
						class="sedna-input w-full text-xl"
						placeholder="Enter your organization..."
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
					<p class="text-sm font-semibold text-sedna-steel-blue-tint mt-2">We won't spam – we will only use your phone number for giveaway and relevant info.</p>
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
					<p class="text-sm font-semibold text-sedna-steel-blue-tint mt-2">We won't spam – we will only use your email for giveaway and relevant info.</p>
				</div>
				<div>
					<label for="state" class="block text-xl font-retro-bold text-sedna-navy mb-3">
						🗺️ State
					</label>
					<select id="state" bind:value={state} class="sedna-input w-full text-xl" required>
						<option value="" disabled selected>Select your state...</option>
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH">Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VT">Vermont</option>
						<option value="VA">Virginia</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
					</select>
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