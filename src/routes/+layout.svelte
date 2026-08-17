<script>
    import '../app.css';
    import { onMount } from 'svelte';
    import { initBootSequence } from '$lib/sound.js';
    import StartSfx from '$lib/assets/sfx/Start.mp3';
    import MenuSfx from '$lib/assets/sfx/Menu.mp3';

    onMount(() => {
        const startOnInteract = () => {
            initBootSequence(StartSfx, MenuSfx);
            window.removeEventListener('pointerdown', startOnInteract);
        };
        window.addEventListener('pointerdown', startOnInteract);
        return () => window.removeEventListener('pointerdown', startOnInteract);
    });
</script>

<slot />

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: hsl(220, 14%, 96%);
        font-family: "Continuum";
    }

    :global(html), :global(body), :global(button), :global(a) {
		cursor: url('$lib/assets/wiiCursor3.png') 13 3, auto !important;
	}

	:global(button:active), :global(a:active) {
		cursor: url('$lib/assets/wiiCursor3.png') 13 3, auto !important;
	}
</style>