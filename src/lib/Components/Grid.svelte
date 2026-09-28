<script>
    import App from './App.svelte';
    import Popup from './Popup.svelte';
    import { playSound } from '$lib/sound.js';
    import selectSfx from '$lib/assets/sfx/Select.wav';
    import openSfx from '$lib/assets/sfx/Open.wav';
    import leftArrow from '../assets/leftArrow.png';
    import rightArrow from '../assets/rightArrow.png';
    import { projects } from '$lib/data/projects.js';

    /** @type {ReturnType<typeof import('$lib/wiiLayout.js').computeLayout> | null} */
    export let layout;

    const MIN_SLOTS = 24; // the Wii Menu always shows a few pages of empty channels

    /** @type {any[]} */
    const realApps = projects;

    // --- Popup: only cycles through real channels, never the empty slots ---
    let selectedIndex = -1;
    // Remembered after closing, so the popup can zoom back into the right tile
    let lastOpenedIndex = -1;
    $: if (selectedIndex !== -1) lastOpenedIndex = selectedIndex;

    const closePopup = () => (selectedIndex = -1);
    const nextPopupApp = () => (selectedIndex = (selectedIndex + 1) % realApps.length);
    const prevPopupApp = () => (selectedIndex = (selectedIndex - 1 + realApps.length) % realApps.length);

    // --- Pages: one long strip of columns, one page = `cols` columns ---
    $: cols = layout?.cols ?? 4;
    $: rows = layout?.rows ?? 3;
    $: itemsPerPage = cols * rows;
    $: totalPages = Math.max(1, Math.ceil(Math.max(MIN_SLOTS, realApps.length) / itemsPerPage));
    $: slotCount = totalPages * itemsPerPage;
    $: pageWidth = layout ? cols * (layout.tileW + layout.gap) : 0;

    let currentPage = 0;
    // Keep the current page valid when the layout changes (e.g. rotating a phone)
    $: if (currentPage > totalPages - 1) currentPage = totalPages - 1;

    // Slot i fills its page left-to-right, top-to-bottom, like the Wii.
    // Declared reactively so tiles re-flow when the column count changes.
    /** @type {(i: number) => { page: number, col: number, row: number }} */
    $: slotPosition = (i) => {
        const page = Math.floor(i / itemsPerPage);
        const j = i % itemsPerPage;
        return { page, col: page * cols + (j % cols) + 1, row: Math.floor(j / cols) + 1 };
    };

    /** @param {number} page */
    function goToPage(page) {
        const target = Math.max(0, Math.min(totalPages - 1, page));
        if (target !== currentPage) {
            currentPage = target;
            playSound(selectSfx, 0.3);
        }
    }

    const nextPage = () => goToPage(currentPage + 1);
    const prevPage = () => goToPage(currentPage - 1);

    /** @param {number} i */
    function onTileClick(i) {
        const { page } = slotPosition(i);
        // Clicking a channel peeking in from the next/previous page scrolls to it
        if (page !== currentPage) return goToPage(page);
        playSound(selectSfx, 0.5);
        playSound(openSfx, 0.5);
        selectedIndex = i;
    }

    // --- Swipe: the strip follows your finger, then snaps to a page ---
    let touchX = 0;
    let touchY = 0;
    let dragX = 0;
    let dragging = false;
    /** @type {boolean | null} */
    let horizontal = null;

    /** @param {TouchEvent} e */
    function onTouchStart(e) {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
        dragX = 0;
        horizontal = null;
        dragging = true;
    }

    /** @param {TouchEvent} e */
    function onTouchMove(e) {
        if (!dragging) return;
        const dx = e.touches[0].clientX - touchX;
        const dy = e.touches[0].clientY - touchY;
        if (horizontal === null && Math.abs(dx) + Math.abs(dy) > 8) horizontal = Math.abs(dx) > Math.abs(dy);
        if (!horizontal) return;
        // Resist at the first and last page
        const atEdge = (dx > 0 && currentPage === 0) || (dx < 0 && currentPage === totalPages - 1);
        dragX = atEdge ? dx * 0.3 : dx;
    }

    function onTouchEnd() {
        if (!dragging) return;
        dragging = false;
        const threshold = Math.min(80, pageWidth * 0.15);
        if (horizontal && dragX < -threshold) nextPage();
        else if (horizontal && dragX > threshold) prevPage();
        dragX = 0;
    }

    /** @param {KeyboardEvent} e */
    function onKeydown(e) {
        // Any open dialog (channel popup, quick access, mail) gets the arrow keys instead
        if (document.querySelector('[aria-modal="true"]')) return;
        if (e.key === 'ArrowRight') nextPage();
        if (e.key === 'ArrowLeft') prevPage();
    }
</script>

<svelte:window on:keydown={onKeydown} />

<div
    class="grid-section"
    on:touchstart|passive={onTouchStart}
    on:touchmove|passive={onTouchMove}
    on:touchend={onTouchEnd}
    on:touchcancel={onTouchEnd}
>
    {#if layout}
        <div
            class="track"
            class:dragging
            style:left="{layout.side}px"
            style:top="{layout.padTop}px"
            style:gap="{layout.gap}px"
            style:grid-template-columns="repeat({totalPages * cols}, {layout.tileW}px)"
            style:grid-template-rows="repeat({rows}, {layout.tileH}px)"
            style:transform="translateX({-currentPage * pageWidth + dragX}px)"
        >
            {#each Array(slotCount) as _, i (i)}
                {@const pos = slotPosition(i)}
                <div class="slot" data-slot={i} style:grid-column={pos.col} style:grid-row={pos.row}>
                    {#if realApps[i]}
                        <App appData={realApps[i]} inactive={pos.page !== currentPage} on:click={() => onTileClick(i)} />
                    {:else}
                        <App appData={{}} />
                    {/if}
                </div>
            {/each}
        </div>

        <!-- Arrows sit in the side margins, over the peeking columns, level with the middle row -->
        <button
            class="arrow-btn"
            style:left="{(layout.side - layout.arrow) / 2}px"
            style:top="{layout.padTop + (rows * layout.tileH + (rows - 1) * layout.gap - layout.arrow) / 2}px"
            style:width="{layout.arrow}px"
            on:click={prevPage}
            disabled={currentPage === 0}
            aria-label="Previous page"
        >
            <img src={leftArrow} alt="">
        </button>
        <button
            class="arrow-btn"
            style:right="{(layout.side - layout.arrow) / 2}px"
            style:top="{layout.padTop + (rows * layout.tileH + (rows - 1) * layout.gap - layout.arrow) / 2}px"
            style:width="{layout.arrow}px"
            on:click={nextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="Next page"
        >
            <img src={rightArrow} alt="">
        </button>
    {/if}
</div>

{#if selectedIndex !== -1}
    <Popup
        app={realApps[selectedIndex]}
        getTileRect={() => document.querySelector(`[data-slot="${lastOpenedIndex}"] .app-card`)?.getBoundingClientRect()}
        on:close={closePopup} on:next={nextPopupApp}
        on:prev={prevPopupApp}
    />
{/if}

<style>
    .grid-section {
        flex: 1;
        min-height: 0;
        width: 100%;
        position: relative;
        /* Above the footer so tooltips on the bottom row aren't hidden;
           the page itself clips the strip at the screen edges */
        z-index: 11;
        touch-action: pan-y;
    }

    .track {
        position: absolute;
        display: grid;
        transition: transform 0.55s cubic-bezier(0.22, 0.8, 0.3, 1);
        will-change: transform;
    }

    .track.dragging {
        transition: none;
    }

    .slot {
        min-width: 0;
        min-height: 0;
    }

    .arrow-btn {
        position: absolute;
        aspect-ratio: 1;
        padding: 0;
        border: none;
        background: none;
        z-index: 20;
        transition: transform 0.2s, opacity 0.2s;
        filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.15));
    }

    .arrow-btn img { width: 100%; height: 100%; display: block; }
    .arrow-btn:hover:not(:disabled) { transform: scale(1.12); }
    .arrow-btn:disabled { opacity: 0; pointer-events: none; }
</style>
