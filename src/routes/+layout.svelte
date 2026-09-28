<script>
    import '../app.css';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
    import { afterNavigate } from '$app/navigation';
    import { screenFlash } from '$lib/transitions.js';
    import { initBootSequence, preloadSounds } from '$lib/sound.js';
    import { sfx } from '$lib/sfxPaths.js';
    import StartSfx from '$lib/assets/sfx/Start.mp3';
    import MenuSfx from '$lib/assets/sfx/Menu.mp3';

    // Shown when the site is shared on LinkedIn, Discord, iMessage, etc.
    const siteTitle = 'Arii — Portfolio';
    const siteDescription = 'Arielle Tetelbaum — UI/UX designer & frontend developer. A portfolio you can browse like the Wii Menu.';

    // Once the new page is on screen, fade away the white channel-switch flash
    afterNavigate(() => {
        if ($screenFlash) setTimeout(() => screenFlash.set(false), 120);
    });

    onMount(() => {
        preloadSounds(Object.values(sfx));

        const startOnInteract = () => {
            initBootSequence(StartSfx, MenuSfx);
            window.removeEventListener('pointerdown', startOnInteract);
        };
        window.addEventListener('pointerdown', startOnInteract);
        return () => window.removeEventListener('pointerdown', startOnInteract);
    });
</script>

<svelte:head>
    <meta name="description" content={siteDescription} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={siteTitle} />
    <meta property="og:description" content={siteDescription} />
    <meta property="og:image" content={`${$page.url.origin}/AriiLogo.png`} />
    <meta name="twitter:card" content="summary" />
</svelte:head>

<slot />

{#if $screenFlash}
    <div class="screen-flash" in:fade={{ duration: 300 }} out:fade={{ duration: 550 }}></div>
{/if}

<style>
    .screen-flash {
        position: fixed;
        inset: 0;
        z-index: 100000;
        background: radial-gradient(circle at 50% 45%, #ffffff 0%, #f4f8fb 60%, #e8f4fb 100%);
        pointer-events: all;
    }

    :global(html), :global(body), :global(button), :global(a) {
        cursor: url('$lib/assets/wiiCursor3.png') 13 3, auto !important;
    }

    :global(button:active), :global(a:active) {
        cursor: url('$lib/assets/wiiCursor3.png') 13 3, auto !important;
    }
</style>
