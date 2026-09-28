<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { introActive } from '$lib/stores.js';
    import { primeAudio, initBootSequence } from '$lib/sound.js';
    import { prefersReducedMotion } from '$lib/transitions.js';
    import { projects } from '$lib/data/projects.js';
    import StartSfx from '$lib/assets/sfx/Start.mp3';
    import MenuSfx from '$lib/assets/sfx/Menu.mp3';

    /**
     * Same layout as the Wii Menu grid, so the skeleton tiles sit exactly
     * where the real channels will appear.
     * @type {ReturnType<typeof import('$lib/wiiLayout.js').computeLayout> | null}
     */
    export let layout;

    const SEEN_KEY = 'arii-intro-seen';

    // Timing (ms), matched to recordings of the real Wii
    const TILE_CYCLE = 2000;      // each skeleton tile fades in, holds, fades out
    const DIAGONAL_STEP = 90;     // delay between diagonals (top-left lights up first)
    const CYCLE_GAP = 350;        // moment of black between skeleton loops
    const MAX_CYCLES = 3;         // keep looping while the channels load, up to this many
    const WARNING_FADE_OUT = 900;
    const BLACK_HOLD = 700;
    const MENU_FADE_IN = 800;

    /** @type {'skeleton' | 'warning' | 'leaving' | 'revealing'} */
    let phase = 'skeleton';
    let cycle = 0;
    let visible = true;
    let isTouch = false;
    let cancelled = false;

    $: cols = layout?.cols ?? 4;
    $: rows = layout?.rows ?? 3;
    $: lastDiagonal = cols - 1 + rows - 1;

    /** @param {number} ms */
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    // Load the channel poster images (and the font) behind the skeleton,
    // so the menu is ready when it appears
    function preloadMenu() {
        const images = projects.map((p) => new Promise((resolve) => {
            const img = new Image();
            img.onload = img.onerror = resolve;
            img.src = p.preview.poster;
        }));
        const loaded = Promise.all([...images, document.fonts?.ready]);
        return Promise.race([loaded, wait(5000)]);
    }

    onMount(() => {
        // Already seen this visit (app.html hides it before paint)
        if (document.documentElement.classList.contains('intro-seen')) {
            visible = false;
            return;
        }

        introActive.set(true);
        isTouch = window.matchMedia('(pointer: coarse)').matches;
        runSkeleton();

        return () => {
            cancelled = true;
            introActive.set(false);
        };
    });

    async function runSkeleton() {
        let ready = false;
        const loading = preloadMenu().then(() => (ready = true));

        if (prefersReducedMotion()) {
            await loading;
        } else {
            for (cycle = 0; cycle < MAX_CYCLES; cycle++) {
                await wait(TILE_CYCLE + lastDiagonal * DIAGONAL_STEP + CYCLE_GAP);
                if (cancelled || phase !== 'skeleton') return;
                if (ready) break;
            }
        }
        if (!cancelled && phase === 'skeleton') phase = 'warning';
    }

    async function continueToMenu() {
        if (phase === 'skeleton') {
            // Impatient click: skip straight to the warning screen
            phase = 'warning';
            return;
        }
        if (phase !== 'warning') return;

        phase = 'leaving';
        // This click is the "user gesture" phones need before they'll play sound
        primeAudio(StartSfx, MenuSfx);
        try {
            sessionStorage.setItem(SEEN_KEY, '1');
        } catch {
            // Storage blocked — the intro will just show again next time
        }

        await wait(WARNING_FADE_OUT + BLACK_HOLD);
        phase = 'revealing';
        initBootSequence(StartSfx, MenuSfx);

        await wait(MENU_FADE_IN);
        visible = false;
        introActive.set(false);
    }

    /** @param {KeyboardEvent} e */
    function onKeydown(e) {
        if (!visible) return;
        // Enter, Space — or "A", like pressing A on the Wii Remote
        if (e.key === 'Enter' || e.key === ' ' || e.key.toLowerCase() === 'a') {
            e.preventDefault();
            continueToMenu();
        }
    }
</script>

<svelte:window on:keydown={onKeydown} />

{#if visible}
    <!-- svelte-ignore a11y_click_events_have_key_events (keys handled on window) -->
    <div
        class="intro"
        class:revealing={phase === 'revealing'}
        style:--menu-fade="{MENU_FADE_IN}ms"
        role="dialog"
        aria-modal="true"
        aria-label="Welcome"
        tabindex="-1"
        on:click={continueToMenu}
    >
        {#if phase === 'skeleton' && layout}
            {#key cycle}
                <div
                    class="skeleton"
                    aria-hidden="true"
                    style:left="{layout.side}px"
                    style:top="{layout.padTop}px"
                    style:gap="{layout.gap}px"
                    style:grid-template-columns="repeat({cols}, {layout.tileW}px)"
                    style:grid-template-rows="repeat({rows}, {layout.tileH}px)"
                >
                    {#each Array(cols * rows) as _, i}
                        <div
                            class="ghost"
                            style:animation-duration="{TILE_CYCLE}ms"
                            style:animation-delay="{((i % cols) + Math.floor(i / cols)) * DIAGONAL_STEP}ms"
                        >
                            <span>Arii</span>
                        </div>
                    {/each}
                </div>
            {/key}
        {/if}

        {#if phase === 'warning' || phase === 'leaving'}
            <div class="warning" class:leaving={phase === 'leaving'} style:--warning-fade="{WARNING_FADE_OUT}ms" in:fade={{ duration: 600 }}>
                <h1>
                    <svg class="warn-icon" viewBox="0 0 24 22" aria-hidden="true">
                        <path d="M12 1.5 23 20.5H1Z" fill="#f7c600" stroke="#f7c600" stroke-width="1.5" stroke-linejoin="round" />
                        <rect x="10.8" y="7.5" width="2.4" height="7.5" rx="1" fill="#111" />
                        <circle cx="12" cy="17.6" r="1.35" fill="#111" />
                    </svg>
                    WARNING-NOSTALGIA AHEAD
                </h1>

                <p class="body">
                    This is the portfolio of Arielle Tetelbaum. It's inspired by the original
                    Wii Menu, so sit back and enjoy the nostalgia.
                </p>

                <p class="small">Best experienced with</p>
                <p class="link">sound on 🔊</p>

                <p class="prompt">{isTouch ? 'Tap' : 'Click'} to continue.</p>
            </div>
        {/if}
    </div>
{/if}

<style>
    .intro {
        position: fixed;
        inset: 0;
        z-index: 200000;
        background: #000;
        overflow: hidden;
        outline: none;
        transition: opacity var(--menu-fade) ease;
        user-select: none;
    }

    /* The menu fades in from black, like the real Wii */
    .intro.revealing {
        opacity: 0;
        pointer-events: none;
    }

    /* Already seen this visit — hidden before the page even paints (see app.html) */
    :global(.intro-seen) .intro {
        display: none;
    }

    /* --- "Return to Wii Menu" skeleton --- */
    .skeleton {
        position: absolute;
        display: grid;
    }

    .ghost {
        container-type: inline-size;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to bottom, #404040, #353535);
        border: clamp(2px, 1.1cqw, 4px) solid #4a4a4a;
        border-radius: 7% / 13%;
        box-sizing: border-box;
        opacity: 0;
        animation-name: ghost-pulse;
        animation-timing-function: ease-in-out;
        animation-fill-mode: both;
    }

    .ghost span {
        font-family: "Continuum", sans-serif;
        font-weight: bold;
        font-size: 13cqw;
        color: #2b2b2b;
    }

    /* Fade in, hold, fade out — delayed per diagonal so it sweeps from the top-left */
    @keyframes ghost-pulse {
        0% { opacity: 0; }
        25% { opacity: 1; }
        70% { opacity: 1; }
        100% { opacity: 0; }
    }

    /* --- Warning screen --- */
    .warning {
        position: absolute;
        inset: 0;
        background: #0d0d0d;
        color: #fff;
        font-family: "Helvetica Neue", Arial, sans-serif;
        font-weight: bold;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
        box-sizing: border-box;
        transition: opacity var(--warning-fade) ease;
    }

    .warning.leaving {
        opacity: 0;
    }

    h1 {
        display: flex;
        align-items: center;
        gap: 0.3em;
        margin: 0 0 1.6em;
        font-size: clamp(1.05rem, 2.9vw, 2.1rem);
        letter-spacing: 0.02em;
    }

    .warn-icon {
        width: 1.15em;
        height: 1.05em;
        flex-shrink: 0;
    }

    .body {
        max-width: 30em;
        margin: 0 0 2.2em;
        font-size: clamp(0.85rem, 2.2vw, 1.55rem);
        line-height: 1.6;
        text-transform: uppercase;
    }

    .small {
        margin: 0 0 0.35em;
        font-size: clamp(0.72rem, 1.7vw, 1.15rem);
    }

    .link {
        margin: 0 0 2em;
        font-size: clamp(0.8rem, 2vw, 1.35rem);
        color: #7eb0f5;
    }

    .prompt {
        margin: 0;
        font-size: clamp(0.95rem, 2.4vw, 1.65rem);
        animation: blink 1.3s ease-in-out infinite;
    }

    /* "Press A to continue." gently blinking in and out */
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.08; }
    }

    @media (prefers-reduced-motion: reduce) {
        .prompt { animation: none; }
    }
</style>
