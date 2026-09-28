<script>
    import { createEventDispatcher } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { playSound } from '$lib/sound.js';
    import { getChannelRoute } from '$lib/data/projects.js';
    import { modal } from '$lib/actions/modal.js';
    import { zoomFromTile, expandToScreen, launchTo } from '$lib/transitions.js';
    import ChannelPreview from './ChannelPreview.svelte';
    import selectSfx from '$lib/assets/sfx/Select.wav';
    import closeSfx from '$lib/assets/sfx/Close.wav';
    import leftArrow from '../assets/leftArrow.png';
    import rightArrow from '../assets/rightArrow.png';

    /** @type {any} */
    export let app;
    /** Where the channel's tile is on screen, so the popup can zoom out of it (and back into it) */
    /** @type {() => DOMRect | null | undefined} */
    export let getTileRect = () => null;

    /** @type {HTMLElement} */
    let windowEl;
    let launching = false;

    const dispatch = createEventDispatcher();

    let showDetails = false;
    let showComingSoon = false;
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let comingSoonTimer;

    $: route = getChannelRoute(app);
    // Reset per-channel UI when flipping between channels
    $: app, (showDetails = false), (showComingSoon = false);

    const close = () => {
        if (launching) return;
        playSound(selectSfx, 0.5);
        playSound(closeSfx, 0.5);
        dispatch('close');
    };
    const next = () => !launching && dispatch('next');
    const prev = () => !launching && dispatch('prev');

    const start = async () => {
        if (launching) return;
        playSound(selectSfx, 0.5);
        if (route) {
            // Like the Wii: the channel fills the screen, washes to white, then loads
            launching = true;
            expandToScreen(windowEl);
            await launchTo(route);
        } else {
            showDetails = false;
            showComingSoon = true;
            clearTimeout(comingSoonTimer);
            comingSoonTimer = setTimeout(() => (showComingSoon = false), 2200);
        }
    };

    const toggleDetails = () => {
        showComingSoon = false;
        showDetails = !showDetails;
    };

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        if (launching) return;
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="backdrop" class:launching role="presentation" on:click|self={close} transition:fade={{ duration: 300 }}>
    <button class="nav-btn left" on:click={prev} aria-label="Previous channel">
        <img src={leftArrow} alt="">
    </button>

    <div
        class="popup-window"
        bind:this={windowEl}
        use:modal={{ onClose: close }}
        aria-label={app.name}
        in:zoomFromTile={{ getRect: getTileRect }}
        out:zoomFromTile={{ getRect: getTileRect }}
    >
        <div class="screen-content">
            {#key app.slug}
                <div class="preview" in:fade={{ duration: 200 }}>
                    <ChannelPreview preview={app.preview} alt={app.name} fit="contain" />
                </div>
            {/key}

            {#if showDetails}
                <div class="details-overlay" transition:fly={{ y: 60, duration: 250 }}>
                    <h3>{app.name}</h3>
                    {#if app.role || app.timeline}
                        <p class="meta">{app.role ?? ''}{#if app.role && app.timeline} · {/if}{app.timeline ?? ''}</p>
                    {/if}
                    <p class="desc">{app.description || "Details coming soon."}</p>
                    {#if app.techStack?.length}
                        <p class="tech">{app.techStack.join(' · ')}</p>
                    {/if}
                </div>
            {/if}

            {#if showComingSoon}
                <div class="coming-soon" transition:fly={{ y: 20, duration: 200 }}>
                    This channel is coming soon!
                </div>
            {/if}
        </div>

        <div class="popup-footer">
            <button class="footer-btn" on:click={close}>Arii Menu</button>
            <button class="footer-btn" on:click={toggleDetails} aria-pressed={showDetails}>Details</button>
            <button class="footer-btn" on:click={start}>Start</button>
        </div>
    </div>

    <button class="nav-btn right" on:click={next} aria-label="Next channel">
        <img src={rightArrow} alt="">
    </button>
</div>

<style>
    .backdrop {
        --arrow-zone: clamp(40px, 8vw, 110px);

        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px var(--arrow-zone);
        box-sizing: border-box;
    }

    .popup-window {
        width: 100%;
        max-width: 860px;
        height: min(78dvh, 620px);
        background: white;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        outline: none;
    }

    .screen-content {
        flex: 1;
        min-height: 0;
        background: #eee;
        position: relative;
        overflow: hidden;
    }

    .preview {
        position: absolute;
        inset: 0;
    }

    .details-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        max-height: 75%;
        overflow-y: auto;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(4px);
        border-top: 2px solid var(--wii-blue);
        padding: 20px 24px;
        text-align: left;
    }

    .details-overlay h3 {
        margin: 0 0 6px;
        color: #444;
        font-size: 1.4rem;
    }

    .details-overlay .meta {
        margin: 0 0 10px;
        color: var(--wii-blue);
        font-weight: bold;
        font-size: 0.9rem;
    }

    .details-overlay .desc {
        margin: 0 0 10px;
        color: #666;
        line-height: 1.5;
    }

    .details-overlay .tech {
        margin: 0;
        color: #999;
        font-size: 0.85rem;
        font-style: italic;
    }

    .coming-soon {
        position: absolute;
        left: 50%;
        bottom: 18px;
        transform: translateX(-50%);
        background: white;
        color: var(--wii-grey-text);
        border: 2px solid var(--wii-blue);
        box-shadow: 0 0 12px var(--wii-glow);
        padding: 10px 22px;
        border-radius: 30px;
        white-space: nowrap;
        font-size: clamp(0.85rem, 2.5vw, 1.05rem);
    }

    .popup-footer {
        flex-shrink: 0;
        height: clamp(64px, 11dvh, 84px);
        background: repeating-linear-gradient(0deg, #ededed, #ededed 2px, #e6e6e6 2px, #e6e6e6 4px);
        border-top: 2px solid #bdbdbd;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 clamp(10px, 3vw, 20px);
        gap: clamp(8px, 3vw, 30px);
    }

    .footer-btn {
        flex: 0 1 140px;
        min-width: 0;
        padding: 10px clamp(8px, 2vw, 24px);
        border-radius: 30px;
        border: 2px solid var(--wii-blue-dark);
        background: white;
        font-weight: bold;
        transition: transform 0.1s;
        font-size: clamp(0.85rem, 2.4vw, 1.1rem);
        color: var(--wii-grey-text);
        box-shadow: inset -4px -5px 5px rgba(0, 83, 150, 0.2);
        white-space: nowrap;
    }

    .footer-btn:hover {
        transform: scale(1.05);
    }

    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        padding: 0;
        z-index: 10;
        opacity: 0.7;
        transition: opacity 0.2s, transform 0.2s;
        width: clamp(30px, 5vw, 60px);
    }

    .launching .nav-btn { opacity: 0; pointer-events: none; }
    .nav-btn:hover { opacity: 1; transform: translateY(-50%) scale(1.08); }
    .nav-btn img { width: 100%; display: block; }

    .left { left: calc((var(--arrow-zone) - clamp(30px, 5vw, 60px)) / 2); }
    .right { right: calc((var(--arrow-zone) - clamp(30px, 5vw, 60px)) / 2); }
</style>
