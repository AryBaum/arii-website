<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import MailBtn from '../assets/MailLogo.png';
    import { playSound } from '$lib/sound.js';
    import footerSfx from '$lib/assets/sfx/Footer.wav';

    const dispatch = createEventDispatcher();

    let date = new Date();
    let mounted = false;

    onMount(() => {
        mounted = true;
        const interval = setInterval(() => {
            date = new Date();
        }, 1000);
        return () => clearInterval(interval);
    });

    $: timeString = `${date.getHours() % 12 || 12}:${String(date.getMinutes()).padStart(2, '0')}`;
    $: period = date.getHours() >= 12 ? 'PM' : 'AM';
    $: dayString = `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getDate()}/${date.getMonth() + 1}`;

    const handleArii = () => {
        playSound(footerSfx, 0.5);
        dispatch('openControlPanel');
    };

    const handleMail = () => {
        playSound(footerSfx, 0.5);
        dispatch('openMail');
    };
</script>

<!--
    Sizes come from CSS variables set by the Wii Menu page ($lib/wiiLayout.js):
    --fh (footer height), --footer-btn, --time-font, --date-font
-->
<footer class="footer-wrap">
    <!-- Shape of the Wii footer: flat sides, a wide smooth dip in the middle
         that's 38% of the footer's height deep -->
    <svg class="footer-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
            <linearGradient id="footer-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#e6e7ea" />
                <stop offset="100%" stop-color="#cdced3" />
            </linearGradient>
        </defs>
        <path d="M0 0 H22 C31 0 31 38 41 38 H59 C69 38 69 0 78 0 H100 V100 H0 Z" fill="url(#footer-fill)" />
        <path d="M0 0 H22 C31 0 31 38 41 38 H59 C69 38 69 0 78 0 H100" class="footer-line" />
    </svg>

    <div class="footer-content">
        <button class="btn" on:click={handleArii} aria-label="Quick access">
            <img src="/AriiLogo.png" alt="">
        </button>

        <div class="clock" aria-hidden={!mounted} style:visibility={mounted ? 'visible' : 'hidden'}>
            <span class="time">{timeString}<span class="period">{period}</span></span>
            <span class="date">{dayString}</span>
        </div>

        <button class="btn" on:click={handleMail} aria-label="Send me a message">
            <img src={MailBtn} alt="">
        </button>
    </div>
</footer>

<style>
    .footer-wrap {
        position: relative;
        width: 100%;
        flex-shrink: 0;
        /* Extra space at the bottom keeps clear of the iPhone home indicator */
        height: calc(var(--fh) + env(safe-area-inset-bottom, 0px));
        padding-bottom: env(safe-area-inset-bottom, 0px);
        box-sizing: border-box;
        z-index: 10;
    }

    .footer-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
        filter: drop-shadow(0 -2px 6px rgba(0, 0, 0, 0.08));
    }

    .footer-line {
        fill: none;
        stroke: var(--wii-blue-dark);
        stroke-width: clamp(3px, calc(var(--fh) * 0.022), 6px);
        stroke-linecap: round;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
    }

    .footer-content {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* Buttons sit about 9% in from each edge, like the Wii */
        padding: 0 max(12px, calc(9vw - var(--footer-btn) / 2));
        color: #6c6c6c;
    }

    .btn {
        width: var(--footer-btn);
        aspect-ratio: 1;
        flex-shrink: 0;
        padding: 0;
        border: none;
        background: none;
        border-radius: 50%;
        /* Wii buttons sit slightly above the footer's middle */
        margin-bottom: calc(var(--fh) * 0.08);
        transition: transform 0.15s ease;
        filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.18));
    }

    .btn img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .btn:hover,
    .btn:focus-visible {
        transform: scale(1.06);
    }

    .btn:focus-visible {
        outline: 3px solid var(--wii-blue);
        outline-offset: 3px;
    }

    .clock {
        /* Centered in the lowered middle section, below the dip */
        align-self: stretch;
        flex: 1;
        min-width: 0;
        padding-top: calc(var(--fh) * 0.38);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1.05;
        color: #8a8a8a;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
        white-space: nowrap;
        user-select: none;
    }

    .time {
        font-size: var(--time-font);
        font-weight: bold;
        letter-spacing: 0.02em;
    }

    .period {
        font-size: 0.45em;
        margin-left: 0.25em;
    }

    .date {
        font-size: var(--date-font);
        font-weight: bold;
        color: #7c7c7c;
        margin-top: calc(var(--fh) * 0.02);
    }
</style>
