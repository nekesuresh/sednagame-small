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
	<slot />
</div> 