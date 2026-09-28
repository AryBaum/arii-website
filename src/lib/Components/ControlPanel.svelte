<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import { muted } from '$lib/stores.js';
    import { modal } from '$lib/actions/modal.js';
    import { launchTo } from '$lib/transitions.js';

    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');

    const toggleMute = () => muted.update(m => !m);
</script>

<div class="backdrop" role="presentation" on:click|self={close}>
    <div class="panel" use:modal={{ onClose: close }} aria-label="Quick access" transition:fly={{ y: 40, duration: 250 }}>
        <div class="panel-header">
            <img src="/AriiLogo.png" alt="Arii" class="mii-icon" />
            <h2>Quick Access</h2>
        </div>

        <div class="links">
            <a href="/resume" class="link-row" on:click|preventDefault={() => launchTo('/resume')}>📄 Resume</a>
            <a href="https://github.com/AryBaum" target="_blank" rel="noopener" class="link-row">💻 GitHub</a>
            <a href="https://linkedin.com/in/arielle-tetelbaum" target="_blank" rel="noopener" class="link-row">🔗 LinkedIn</a>
            <button class="link-row" on:click={toggleMute} aria-pressed={$muted}>
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
        width: 100%; height: 100%;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
    }

    .panel {
        width: 100%;
        max-width: 320px;
        outline: none;
        background: white;
        border-radius: 20px;
        border: 3px solid var(--wii-blue);
        box-shadow: 0 0 20px var(--wii-glow);
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
        background: var(--wii-blue-soft);
    }

    .close-btn {
        width: 100%;
        padding: 10px;
        border-radius: 30px;
        border: 2px solid var(--wii-blue-dark);
        background: white;
        font-weight: bold;
        color: var(--wii-grey-text);
        cursor: pointer;
    }
</style>