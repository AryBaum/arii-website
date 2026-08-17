<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import { muted } from '$lib/stores.js';

    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');

    const toggleMute = () => muted.update(m => !m);
</script>

<div class="backdrop" on:click|self={close}>
    <div class="panel">
        <div class="panel-header">
            <img src="AriiLogo.png" alt="Arii" class="mii-icon" />
            <h2>Quick Access</h2>
        </div>

        <div class="links">
            <a href="/resume.pdf" target="_blank" class="link-row">📄 Download Resume</a>
            <a href="https://github.com/YOUR_USERNAME" target="_blank" class="link-row">💻 GitHub</a>
            <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" class="link-row">🔗 LinkedIn</a>
            <button class="link-row" on:click={toggleMute}>
                {$muted ? '🔇 Sound Off' : '🔊 Sound On'}
            </button>
        </div>

        <button class="close-btn" on:click={close}>Close</button>
    </div>
</div>

<style>
    .backdrop {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 22vh;
    }

    .panel {
        width: 320px;
        background: white;
        border-radius: 20px;
        border: 3px solid #58cdf8;
        box-shadow: 0 0 20px rgba(88, 205, 248, 0.5);
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
    }

    .panel-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 16px;
    }

    .mii-icon {
        width: 60px;
        height: 60px;
        margin-bottom: 8px;
    }

    .panel-header h2 {
        margin: 0;
        color: #555;
        font-size: 1.2rem;
    }

    .links {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 16px;
    }

    .link-row {
        display: block;
        padding: 10px 16px;
        border-radius: 12px;
        background: #f4f4f4;
        color: #555;
        text-decoration: none;
        font-weight: bold;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.15s;
    }

    .link-row:hover {
        background: #e0f5fd;
    }

    .close-btn {
        width: 100%;
        padding: 10px;
        border-radius: 30px;
        border: 2px solid #48c5f3;
        background: white;
        font-weight: bold;
        color: #747474;
        cursor: pointer;
    }
</style>