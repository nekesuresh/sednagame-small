<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { AnswerHandler } from '$lib/utils/AnswerHandler';

	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const columnCount = Math.floor(window.innerWidth / 22); // 22px per column
	const fontSize = 28;
	const speedMin = 2; // px per frame
	const speedMax = 8;

	let columns: {
		x: number;
		y: number;
		speed: number;
		trail: string[];
		color: string;
	}[] = [];

	function randomChar() {
		return chars[Math.floor(Math.random() * chars.length)];
	}

	function randomColor() {
		return Math.random() > 0.5 ? '#c29a3b' : '#d5dde3';
	}

	function resetColumn(col: any) {
		col.y = Math.random() * -window.innerHeight;
		col.speed = speedMin + Math.random() * (speedMax - speedMin);
		col.trail = Array.from({ length: Math.floor(10 + Math.random() * 10) }, randomChar);
		col.color = randomColor();
	}

	function setupColumns() {
		columns = Array.from({ length: columnCount }, (_, i) => {
			const col = {
				x: i * (window.innerWidth / columnCount),
				y: Math.random() * window.innerHeight,
				speed: speedMin + Math.random() * (speedMax - speedMin),
				trail: Array.from({ length: Math.floor(10 + Math.random() * 10) }, randomChar),
				color: randomColor()
			};
			return col;
		});
	}

	let interval: any;
	onMount(() => {
		setupColumns();
		interval = setInterval(() => {
			for (const col of columns) {
				col.y += col.speed;
				if (col.y > window.innerHeight + col.trail.length * fontSize) {
					resetColumn(col);
				}
				// update trail
				if (Math.random() > 0.7) {
					col.trail[Math.floor(Math.random() * col.trail.length)] = randomChar();
				}
			}
			columns = columns; // Trigger Svelte reactivity
		}, 50);
		window.addEventListener('resize', setupColumns);
		// Remove redirect to /gameshow or /setup; always show start page
		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', setupColumns);
		};
	});

	function handleStart() {
		localStorage.removeItem('sedna_show_start_page');
		goto('/setup');
	}
</script>

<style>
html, body {
	height: 100vh;
	width: 100vw;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
.page-container {
	position: relative;
	background: white;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}
.matrix-rain {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	pointer-events: none;
	z-index: 1;
}
.matrix-col {
	position: absolute;
	top: 0;
	will-change: transform;
}
.matrix-char {
	font-family: 'Courier New', monospace;
	font-size: 28px;
	opacity: 0.8;
	user-select: none;
	display: block;
	text-shadow: 0 0 8px rgba(0,0,0,0.18);
}
.gold {
	color: #c29a3b;
}
.bluegrey {
	color: #d5dde3;
}
@keyframes matrixRain {
	0% { opacity: 0.1; }
	50% { opacity: 1; }
	100% { opacity: 0.1; }
}
.start-button {
	font-size: 24px;
	padding: 20px 40px;
	background-color: #c29a3b;
	border-radius: 12px;
	color: black;
	font-weight: bold;
	border: none;
	cursor: pointer;
	margin-top: 32px;
	z-index: 2;
	box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
	transition: background 0.2s;
	display: block;
	margin-left: auto;
	margin-right: auto;
}
.start-button:hover {
	background-color: #a07d2a;
}
.header-content {
	position: relative;
	z-index: 3;
	text-align: center;
	margin-top: 8vh;
}
</style>

<div class="page-container">
	<div class="matrix-rain" style="z-index:0; pointer-events:none;">
		{#each columns as col}
			<div
				class="matrix-col"
				style="left: {col.x}px; top: 0; height: 100vh;"
			>
				{#each col.trail as char, j}
					<span
						class="matrix-char"
						style="
							color: {col.color};
							opacity: {Math.max(0.1, 1 - (col.trail.length - j) / col.trail.length)};
							transform: translateY({col.y - (col.trail.length - j) * fontSize}px);
						"
					>{char}</span>
				{/each}
			</div>
		{/each}
	</div>
	<div class="min-h-screen bg-gradient-to-br from-sedna-cool-blue via-sedna-dark-blue to-sedna-navy flex items-center justify-center p-4" style="position:relative; z-index:2;">
		<div class="max-w-4xl mx-auto text-center">
			<!-- Logo/Header -->
			<div class="text-center mb-12">
				<h1 class="text-5xl md:text-7xl font-retro-bold text-sedna-orange mb-4 drop-shadow-lg">
					🎮 AI or A-Lie
				</h1>
				<p class="text-2xl md:text-3xl font-retro text-sedna-light-grey mb-8">
					Come test your knowledge in Sedna's AI-powered game!
				</p>
			</div>

			<!-- Game Description -->
			<div class="sedna-card mb-12">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					<div class="text-center">
						<div class="text-4xl mb-4">🤖</div>
						<h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-2">
							AI Myths vs Facts
						</h3>
						<p class="sedna-text">
							Separate AI fiction from reality with our interactive quiz
						</p>
					</div>
					<div class="text-center">
						<div class="text-4xl mb-4">🏆</div>
						<h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-2">
							Earn Points
						</h3>
						<p class="sedna-text">
							Score points and track your progress as you learn
						</p>
					</div>
					<div class="text-center">
						<div class="text-4xl mb-4">💡</div>
						<h3 class="text-xl font-retro-bold text-sedna-cool-blue mb-2">
							Learn from Sedna
						</h3>
						<p class="sedna-text">
							Discover real AI success stories from government projects
						</p>
					</div>
				</div>
			</div>

			<!-- Start Button -->
			<div class="mb-8">
				<button
					on:click={handleStart}
					class="sedna-btn sedna-btn-accent text-4xl md:text-5xl py-8 px-16 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
				>
					🎯 START GAME
				</button>
			</div>

			<!-- Footer -->
			<div class="text-center">
				<p class="sedna-text text-sedna-dark-grey">
					Powered by <span class="sedna-highlight">Sedna Consulting Group</span>
				</p>
				<p class="sedna-text text-sedna-dark-grey text-sm mt-2">
					Offline AI-powered learning experience
				</p>
			</div>
		</div>
	</div>
</div> 