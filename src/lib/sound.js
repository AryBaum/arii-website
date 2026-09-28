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
let booted = false;

/**
 * @param {string} startSrc
 * @param {string} menuSrc
 */
export function initBootSequence(startSrc, menuSrc) {
    if (booted) return;
    booted = true;

    const startAudio = new Audio(startSrc);
    const musicAudio = new Audio(menuSrc);
    musicAudio.loop = true;
    startAudio.volume = 0.5;
    musicAudio.volume = 0.22;

    /** @param {boolean} isMuted */
    const applyMute = (isMuted) => {
        startAudio.muted = isMuted;
        musicAudio.muted = isMuted;
    };

    applyMute(get(muted));
    muted.subscribe(applyMute);

    startAudio.play().catch(() => {});
    startAudio.addEventListener('ended', () => {
        musicAudio.play().catch(() => {});
    });
}
