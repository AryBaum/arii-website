<script>
    import { playSound } from '$lib/sound.js';
    import hoverSfx from '$lib/assets/sfx/Hover.wav';
    import ChannelPreview from './ChannelPreview.svelte';

    /** @type {any} */
    export let appData;
    /** Tile belongs to a page that's only peeking in at the edge */
    export let inactive = false;

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.currentTarget?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
    }
</script>

{#if appData.preview}
    <div
        class="app-wrapper"
        role="button"
        tabindex={inactive ? -1 : 0}
        aria-label={appData.name}
        on:click
        on:keydown={handleKeydown}
        on:mouseenter={() => playSound(hoverSfx, 0.35)}
    >
        <div class="app-card">
            <ChannelPreview preview={appData.preview} alt={appData.name} />
        </div>

        <div class="tooltip">
            {appData.name}
        </div>
    </div>
{:else}
    <div class="app-wrapper" aria-hidden="true">
        <div class="app-card is-placeholder">
            <span class="placeholder-text">Arii</span>
        </div>
    </div>
{/if}

<style>
    .app-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        outline: none;
        container-type: inline-size;
    }

    .app-card {
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #fafafa, #e4e4e4);
        /* Wii channel tiles: gently rounded, thin light-grey frame */
        border-radius: 7% / 13%;
        border: clamp(2px, 1.1cqw, 4px) solid #c2c2c2;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.7);
        box-sizing: border-box;
        /* Glow fades out fairly quickly when the pointer leaves… */
        transition: box-shadow 0.6s ease, border-color 0.6s ease;
        overflow: hidden;
        position: relative;
    }

    .app-wrapper:hover .app-card:not(.is-placeholder),
    .app-wrapper:focus-visible .app-card:not(.is-placeholder) {
        box-shadow: 0 0 6px 3px var(--wii-blue);
        border-color: var(--wii-blue);
        /* …and fades in slowly and softly on hover, like the Wii */
        transition: box-shadow 1.2s ease-out, border-color 1s ease-out;
    }

    .tooltip {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 4px);

        background-color: white;
        color: grey;
        padding: 6px 18px;
        border-radius: 50px;
        font-family: "Continuum", sans-serif;
        font-size: clamp(0.8rem, 6cqw, 1.15rem);
        white-space: nowrap;
        pointer-events: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);

        opacity: 0;
        transition: opacity 0.2s ease-out, transform 0.2s ease-out;
        z-index: 100;
    }

    .app-wrapper:hover .tooltip,
    .app-wrapper:focus-visible .tooltip {
        opacity: 1;
        transform: translate(-50%, -40%);
    }

    /* No hover on touch screens, so the tooltip would never show anyway */
    @media (hover: none) {
        .tooltip { display: none; }
    }

    .is-placeholder {
        background: linear-gradient(to bottom, #f2f2f2, #d9d9d9);
        border-color: #cfcfcf;
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .placeholder-text {
        font-family: "Continuum", sans-serif;
        font-size: 11cqw;
        font-weight: bold;
        color: #a9adb2;
        opacity: 0.35;
        letter-spacing: 1px;
        user-select: none;
    }
</style>
