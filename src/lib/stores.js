import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const MUTED_KEY = 'arii-muted';

function readMuted() {
    if (!browser) return false;
    try {
        return localStorage.getItem(MUTED_KEY) === 'true';
    } catch {
        return false;
    }
}

// Remembered across visits, so people who turned the sound off don't get the jingle again
export const muted = writable(readMuted());

// True while the startup intro (skeleton + warning screen) is on screen.
// The intro starts the boot music itself when it finishes.
export const introActive = writable(false);

if (browser) {
    muted.subscribe((value) => {
        try {
            localStorage.setItem(MUTED_KEY, String(value));
        } catch {
            // Private mode / storage blocked — mute still works for this visit
        }
    });
}
