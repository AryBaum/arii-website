<script>
    import { createEventDispatcher, tick } from 'svelte';
    import { fly } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { playSound } from '$lib/sound.js';
    import selectSfx from '$lib/assets/sfx/Select.wav';
    import closeSfx from '$lib/assets/sfx/Close.wav';
    import leftArrow from '../assets/leftArrow.png';
    import rightArrow from '../assets/rightArrow.png';

    export let app;

    const dispatch = createEventDispatcher();

    let showDetails = false;

    const close = () => {
        playSound(selectSfx, 0.5);
        playSound(closeSfx, 0.5);
        showDetails = false;
        dispatch('close');
    };
    const next = () => { showDetails = false; dispatch('next'); };
    const prev = () => { showDetails = false; dispatch('prev'); };

    const start = async () => {
        playSound(selectSfx, 0.5);
        if (app.route) {
            dispatch('close');
            await tick();
            goto(app.route);
        } else {
            alert("Coming soon!");
        }
    };

    const toggleDetails = () => {
        showDetails = !showDetails;
    };

    function handleKeydown(e) {
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="backdrop" on:click|self={close}>
    <div class="popup-window">
        <button class="nav-btn left" on:click={prev}>
            <img src={leftArrow} alt="<">
        </button>

        <button class="nav-btn right" on:click={next}>
            <img src={rightArrow} alt=">">
        </button>

        <div class="screen-content">
            {#if app.gif}
                <img src={app.gif} alt={app.name} class="large-gif" />
            {:else}
                <div class="placeholder-large">
                    <h1>{app.name}</h1>
                </div>
            {/if}

            {#if showDetails}
                <div class="details-overlay" transition:fly={{ y: 60, duration: 250 }}>
                    <h3>{app.name}</h3>
                    {#if app.role || app.year}
                        <p class="meta">{app.role}{#if app.role && app.year} · {/if}{app.year}</p>
                    {/if}
                    <p class="desc">{app.description || "Details coming soon."}</p>
                    {#if app.techStack && app.techStack.length}
                        <p class="tech">{app.techStack.join(' · ')}</p>
                    {/if}
                </div>
            {/if}
        </div>

        <div class="popup-footer">
            <button class="footer-btn" on:click={close}>Arii Menu</button>
            <button class="footer-btn" on:click={toggleDetails}>Details</button>
            <button class="footer-btn start-btn" on:click={start}>Start</button>
        </div>
    </div>
</div>

<style>
    .backdrop {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.85);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .popup-window {
        width: 80%;
        max-width: 800px;
        height: 70%;
        background: white;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }

    .screen-content {
        flex: 1;
        background: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
    }

    .large-gif {
        height: 100%;
        width: auto;
        max-width: 100%;
        object-fit: contain;
    }

    .placeholder-large {
        color: #888;
        font-size: 2rem;
    }

    .details-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        max-height: 70%;
        overflow-y: auto;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(4px);
        border-top: 2px solid #58cdf8;
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
        color: #58cdf8;
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

    .popup-footer {
        height: 80px;
        background: repeating-linear-gradient(
         0deg,
         #ededed,
         #ededed 2px,
         #e6e6e6 2px,
         #e6e6e6 4px
        );
        border-top: 2px solid #bdbdbd;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        gap: 30px;
    }

    .footer-btn {
        width: 130px;
        padding: 10px 30px;
        border-radius: 30px;
        border: 2px solid #48c5f3;
        background: white;
        font-weight: bold;
        transition: transform 0.1s;
        font-size: 1.1rem;
        color: #747474;
        box-shadow: inset -4px -5px 5px rgba(0, 83, 150, 0.2);
        white-space: nowrap;
    }
    .footer-btn:hover {
        transform: scale(1.05);
    }

    @media (max-width: 600px) {
        .popup-footer {
            gap: 15px;
        }

        .footer-btn {
            width: 100px;
            flex: 1;
            font-size: 0.9rem;
            padding: 10px 15px;
        }
    }

    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        z-index: 10;
        opacity: 0.5;
        transition: opacity 0.2s;
        width: 60px;
    }

    .nav-btn:hover { opacity: 1; }
    .nav-btn img { width: 100%; }

    .left { left: 10px; }
    .right { right: 10px; }
</style>