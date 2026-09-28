import { get } from 'svelte/store';
import { muted } from './stores.js';

/** @type {AudioContext | undefined} */
let audioCtx;
/** @type {Record<string, AudioBuffer>} */
const bufferCache = {};

function getContext() {
    if (!audioCtx) {
        const Ctx = window.AudioContext || /** @type {any} */ (window).webkitAudioContext;
        audioCtx = /** @type {AudioContext} */ (new Ctx());
    }
    return audioCtx;
}

/** @param {string} src */
async function loadBuffer(src) {
    if (bufferCache[src]) return bufferCache[src];
    const ctx = getContext();
    const res = await fetch(src);
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    bufferCache[src] = audioBuffer;
    return audioBuffer;
}

// Call once at app boot to decode SFX ahead of time — removes first-click delay
/** @param {string[]} srcList */
export function preloadSounds(srcList) {
    srcList.forEach(src => loadBuffer(src).catch(() => {}));
}

/**
 * @param {string} src
 * @param {number} [volume]
 */
export async function playSound(src, volume = 0.4) {
    if (get(muted)) return;
    try {
        const ctx = getContext();
        if (ctx.state === 'suspended') await ctx.resume();
        const buffer = await loadBuffer(src);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode).connect(ctx.destination);
        source.start(0);
    } catch (e) {
        console.error('playSound failed', e);
    }
}

// --- Background boot sequence (Start jingle -> looping Menu music) ---
/** @type {HTMLAudioElement | null} */
let startAudio = null;
/** @type {HTMLAudioElement | null} */
let musicAudio = null;
let booted = false;

/**
 * @param {string} startSrc
 * @param {string} menuSrc
 */
function ensureBootAudio(startSrc, menuSrc) {
    if (startAudio && musicAudio) return { startAudio, musicAudio };
    const start = new Audio(startSrc);
    const music = new Audio(menuSrc);
    music.loop = true;
    start.volume = 0.5;
    music.volume = 0.22;
    muted.subscribe((isMuted) => {
        start.muted = isMuted;
        music.muted = isMuted;
    });
    startAudio = start;
    musicAudio = music;
    return { startAudio: start, musicAudio: music };
}

/**
 * Call this inside a click/tap. Phones (especially iPhones) only let audio
 * play if it was started during a user gesture, so this silently plays and
 * pauses the boot audio to unlock it for initBootSequence() a moment later.
 * @param {string} startSrc
 * @param {string} menuSrc
 */
export function primeAudio(startSrc, menuSrc) {
    try {
        const ctx = getContext();
        if (ctx.state === 'suspended') ctx.resume();
    } catch {
        // No Web Audio support — sound effects just won't play
    }
    const { startAudio, musicAudio } = ensureBootAudio(startSrc, menuSrc);
    for (const el of [startAudio, musicAudio]) {
        const wasMuted = el.muted;
        el.muted = true;
        el.play()
            .then(() => {
                if (booted && el === startAudio) return; // already playing for real
                el.pause();
                el.currentTime = 0;
            })
            .catch(() => {})
            .finally(() => (el.muted = wasMuted || get(muted)));
    }
}

/**
 * @param {string} startSrc
 * @param {string} menuSrc
 */
export function initBootSequence(startSrc, menuSrc) {
    if (booted) return;
    booted = true;

    const { startAudio, musicAudio } = ensureBootAudio(startSrc, menuSrc);
    startAudio.currentTime = 0;
    startAudio.play().catch(() => {});
    startAudio.addEventListener('ended', () => {
        musicAudio.play().catch(() => {});
    });
}
