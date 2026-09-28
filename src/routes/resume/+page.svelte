<script>
    import { onMount } from 'svelte';
    import { playSound } from '$lib/sound.js';
    import { launchTo } from '$lib/transitions.js';
    import footerSfx from '$lib/assets/sfx/Footer.wav';
    import PdfViewer from '$lib/Components/PdfViewer.svelte';

    const RESUME = '/resume.pdf';

    // Desktop browsers have a great built-in PDF viewer. Phones and tablets
    // don't (iOS shows a flat picture of page 1), so there we draw the pages ourselves.
    /** @type {'native' | 'drawn' | null} */
    let viewer = null;
    onMount(() => {
        const touchOrSmall = window.matchMedia('(pointer: coarse), (max-width: 800px)').matches;
        viewer = touchOrSmall ? 'drawn' : 'native';
    });

    const backToMenu = () => {
        playSound(footerSfx, 0.5);
        launchTo('/');
    };
</script>

<svelte:head>
    <title>Resume — Arii</title>
</svelte:head>

<div class="resume-page channel-in" class:fill-screen={viewer === 'native'}>
    <div class="breadcrumb">
        <button on:click={backToMenu}>&lt; Arii Menu</button>
        <span class="crumb-sep">/</span>
        <span>Resume</span>
    </div>

    <div class="resume-card">
        {#if viewer === 'native'}
            <embed src={RESUME} type="application/pdf" class="resume-embed" />
        {:else if viewer === 'drawn'}
            <PdfViewer src={RESUME} />
        {/if}
        <a href={RESUME} download class="download-btn">Download PDF</a>
    </div>
</div>

<style>
    .resume-page {
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 24px 60px;
        color: #4a4a4a;
        font-family: "Continuum", sans-serif;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    /* The built-in viewer scrolls inside itself, so it fills the screen */
    .resume-page.fill-screen {
        height: 100vh;
        height: 100dvh;
    }

    @media (max-width: 600px) {
        .resume-page {
            padding: 20px 12px 40px;
        }
    }

    .channel-in {
        animation: channel-in 0.6s cubic-bezier(0.22, 0.8, 0.3, 1) both;
    }

    /* "Channel boot": content settles in as the white flash fades */
    @keyframes channel-in {
        from { opacity: 0; transform: translateY(14px) scale(0.985); }
        to { opacity: 1; transform: none; }
    }

    @media (prefers-reduced-motion: reduce) {
        .channel-in { animation: none; }
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 20px;
        font-size: 0.95rem;
        color: #888;
        flex-shrink: 0;
    }

    .breadcrumb button {
        background: none;
        border: none;
        color: var(--wii-blue);
        font-weight: bold;
        cursor: pointer;
        font-size: 0.95rem;
        padding: 8px 4px;
        margin: -8px -4px;
    }

    .crumb-sep { color: #ccc; }

    .resume-card {
        flex: 1;
        min-height: 0;
        background: white;
        border-radius: 20px;
        border: 2px solid #e0e0e0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }

    .resume-embed {
        flex: 1;
        width: 100%;
        border: none;
    }

    .download-btn {
        text-align: center;
        padding: 14px;
        background: var(--wii-blue);
        color: white;
        font-weight: bold;
        text-decoration: none;
        flex-shrink: 0;
    }
</style>
