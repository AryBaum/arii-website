<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import leftArrow from '../assets/leftArrow.png';
    import rightArrow from '../assets/rightArrow.png';

    export let app;

    const dispatch = createEventDispatcher();

    const close = () => dispatch('close');
    const next = () => dispatch('next');
    const prev = () => dispatch('prev');

    const start = () => {
        if (app.link) window.location.href = app.link;
        else alert("No link available for this app yet!");
    };

    const showDetails = () => {
        alert(`Details for ${app.name}: \n${app.description || "No descrition available."}`);
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
        </div>

        <div class="popup-footer">
            <button class="footer-btn" on:click={close}>Arii Menu</button>
            <button class="footer-btn" on:click={showDetails}>Details</button>
            <button class="footer-btn start-btn" on:click={start}>Start</button>
        </div>
    </div>
</div>

<style>
    .backdrop {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.85); /* Dark background behind popup */
        z-index: 9999; /* Sit on top of everything */
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
    }

    .large-gif {
        height: 100%;
        width: auto;
        max-width: 100%;
        object-fit: contain; /**Fills container with image but keeps dimensions*/
    }

    .placeholder-large {
        color: #888;
        font-size: 2rem;
    }

    /* Footer Styles */
    .popup-footer {
        height: 80px;
        background: repeating-linear-gradient(
         0deg,              /* 1. Angle of the stripes */
         #ededed,            /* 2. Color A Start */
         #ededed 2px,       /* 3. Color A End (width of white stripe) */
         #e6e6e6 2px,       /* 4. Color B Start */
         #e6e6e6 4px        /* 5. Color B End (width of grey stripe) */
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

    /* --- MOBILE OPTIMIZATION --- */
    @media (max-width: 600px) {
        .popup-footer {
            gap: 15px; /* Bring them closer on phones */
        }

        .footer-btn {
            width: 100px;
            flex: 1;
            font-size: 0.9rem; /* Smaller text */
            padding: 10px 15px; /* Smaller button size */
        }
    }

    /* Navigation Arrows */
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