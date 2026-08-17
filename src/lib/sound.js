import { get } from 'svelte/store';
import { muted } from './stores.js';

const sfxCache = {};

export function playSound(src, volume = 0.4) {
    if (get(muted)) return;
    if (!sfxCache[src]) sfxCache[src] = new Audio(src);
    const audio = sfxCache[src].cloneNode();
    audio.volume = volume;
    audio.play().catch(() => {});
}

// --- Background boot sequence (Start jingle -> looping Menu music) ---
let startAudio = null;
let musicAudio = null;
let booted = false;

export function initBootSequence(startSrc, menuSrc, { startVolume = 0.5, menuVolume = 0.22 } = {}) {
    if (booted) return;
    booted = true;

    startAudio = new Audio(startSrc);
    musicAudio = new Audio(menuSrc);
    musicAudio.loop = true;

    const applyVolumes = (isMuted) => {
        startAudio.volume = isMuted ? 0 : startVolume;
        musicAudio.volume = isMuted ? 0 : menuVolume;
    };

    applyVolumes(get(muted));
    muted.subscribe(applyVolumes);

    startAudio.play().catch(() => {});
    startAudio.addEventListener('ended', () => {
        musicAudio.play().catch(() => {});
    });
}