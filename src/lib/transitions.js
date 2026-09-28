import { writable } from 'svelte/store';
import { cubicOut } from 'svelte/easing';
import { goto } from '$app/navigation';

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Wii-style channel zoom: the element grows out of (or shrinks back into)
 * the tile it was opened from. Falls back to a simple fade if the tile isn't
 * on screen.
 *
 * Usage: <div in:zoomFromTile={{ getRect }} out:zoomFromTile={{ getRect }}>
 *
 * @param {Element} node
 * @param {{ getRect?: () => DOMRect | null | undefined, duration?: number }} params
 */
export function zoomFromTile(node, { getRect, duration = 420 } = {}) {
    const from = getRect?.();
    const onScreen = from && from.width > 0 && from.right > 0 && from.left < window.innerWidth;

    if (!onScreen || prefersReducedMotion()) {
        return { duration: 200, css: (/** @type {number} */ t) => `opacity: ${t}` };
    }

    const to = node.getBoundingClientRect();
    const sx = from.width / to.width;
    const sy = from.height / to.height;
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);

    return {
        duration,
        easing: cubicOut,
        css: (/** @type {number} */ t, /** @type {number} */ u) =>
            `transform: translate(${dx * u}px, ${dy * u}px) scale(${sx + (1 - sx) * t}, ${sy + (1 - sy) * t});` +
            `transform-origin: center;`
    };
}

/** @param {number} ms */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// White "channel loading" flash that covers page changes (see +layout.svelte)
export const screenFlash = writable(false);

/**
 * Navigate like switching channels on the Wii: the screen washes to white,
 * the new page loads underneath, then the white fades away.
 * @param {string} route
 */
export async function launchTo(route) {
    screenFlash.set(true);
    await wait(prefersReducedMotion() ? 0 : 380);
    await goto(route);
    // +layout.svelte clears the flash once the new page has rendered
}

/**
 * Expands the channel popup to fill the screen when you press Start.
 * Uses the Web Animations API so it keeps running while the page changes.
 * @param {HTMLElement} node
 */
export function expandToScreen(node) {
    if (prefersReducedMotion()) return;
    const r = node.getBoundingClientRect();
    const sx = window.innerWidth / r.width;
    const sy = window.innerHeight / r.height;
    const dx = window.innerWidth / 2 - (r.left + r.width / 2);
    const dy = window.innerHeight / 2 - (r.top + r.height / 2);
    node.animate(
        [
            { transform: 'none', borderRadius: '20px' },
            { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, borderRadius: '0px' }
        ],
        { duration: 450, easing: 'cubic-bezier(0.55, 0, 0.3, 1)', fill: 'forwards' }
    );
}
