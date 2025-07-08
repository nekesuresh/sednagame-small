<script>
	import '../app.css';
	import { onMount } from 'svelte';

	onMount(() => {
		// Prevent right-click context menu in kiosk mode
		document.addEventListener('contextmenu', (e) => e.preventDefault());
		
		// Prevent text selection in kiosk mode
		document.addEventListener('selectstart', (e) => e.preventDefault());
		
		// Add fullscreen support
		document.addEventListener('keydown', (e) => {
			if (e.key === 'F11') {
				e.preventDefault();
				if (document.fullscreenElement) {
					document.exitFullscreen();
				} else {
					document.documentElement.requestFullscreen();
				}
			}
		});
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-retro-slate-darkest via-retro-slate-darker to-retro-slate-dark">
	<header class="w-full flex justify-center items-center py-6">
		<picture>
			<source srcset="/sedna-logos/sedna1.png" media="(prefers-color-scheme: light)" />
			<img src="/sedna-logos/sedna2.jpeg" alt="Sedna Consulting Group Logo" class="h-16 md:h-20 drop-shadow-lg" style="max-width: 90vw; object-fit: contain;" />
		</picture>
	</header>
	<slot />
</div> 