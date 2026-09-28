<script>
    import { page } from '$app/stores';
    import { launchTo } from '$lib/transitions.js';
    import { playSound } from '$lib/sound.js';
    import footerSfx from '$lib/assets/sfx/Footer.wav';

    $: status = $page.status;
    $: message = status === 404
        ? "This channel doesn't exist."
        : "Something went wrong loading this channel.";

    const backHome = () => {
        playSound(footerSfx, 0.5);
        launchTo('/');
    };
</script>

<svelte:head>
    <title>{status} — Arii</title>
</svelte:head>

<div class="error-page">
    <div class="error-card">
        <div class="error-code">{status}</div>
        <div class="static-bars">
            <span></span><span></span><span></span><span></span><span></span>
        </div>
        <h1>{message}</h1>
        <p>Looks like this tile got lost between discs. Let's get you back to the menu.</p>
        <button class="home-btn" on:click={backHome}>&lt; Back to Arii Menu</button>
    </div>
</div>

<style>
    .error-page {
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background: repeating-linear-gradient(
            0deg,
            #ededed,
            #ededed 3px,
            #e6e6e6 3px,
            #e6e6e6 6px
        );
        box-sizing: border-box;
        padding: 20px;
    }

    .error-card {
        background: white;
        border: 3px solid var(--wii-blue);
        border-radius: 24px;
        box-shadow: 0 0 24px rgba(88, 205, 248, 0.4);
        padding: 40px 32px;
        max-width: 420px;
        width: 100%;
        text-align: center;
    }

    .error-code {
        font-size: 4.5rem;
        font-weight: bold;
        color: var(--wii-blue);
        line-height: 1;
        margin-bottom: 4px;
        font-family: "Continuum", sans-serif;
    }

    .static-bars {
        display: flex;
        justify-content: center;
        gap: 4px;
        margin: 12px 0 20px;
        height: 30px;
    }

    .static-bars span {
        width: 6px;
        border-radius: 3px;
        background: #cfeefc;
        animation: bounce 1.1s ease-in-out infinite;
    }

    .static-bars span:nth-child(1) { animation-delay: 0s; }
    .static-bars span:nth-child(2) { animation-delay: 0.1s; }
    .static-bars span:nth-child(3) { animation-delay: 0.2s; }
    .static-bars span:nth-child(4) { animation-delay: 0.3s; }
    .static-bars span:nth-child(5) { animation-delay: 0.4s; }

    @keyframes bounce {
        0%, 100% { height: 8px; background: #cfeefc; }
        50% { height: 30px; background: var(--wii-blue); }
    }

    h1 {
        font-size: 1.3rem;
        color: #444;
        margin: 0 0 10px;
    }

    p {
        color: #888;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0 0 24px;
    }

    .home-btn {
        background: var(--wii-blue);
        color: white;
        border: none;
        border-radius: 30px;
        padding: 12px 28px;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.1s;
    }

    .home-btn:hover {
        transform: scale(1.05);
    }
</style>