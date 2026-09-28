<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import { modal } from '$lib/actions/modal.js';

    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');

    let name = '';
    let email = '';
    let message = '';
    let sent = false;
    let sending = false;

    async function handleSubmit() {
        sending = true;
        // Swap this endpoint for Formspree / Web3Forms / your own API route
        try {
            const res = await fetch('https://formspree.io/f/mvkpwdvr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            if (res.ok) sent = true;
        } catch (e) {
            console.error(e);
        } finally {
            sending = false;
        }
    }
</script>

<div class="backdrop" role="presentation" on:click|self={close}>
    <div class="envelope" use:modal={{ onClose: close }} aria-label="Send me a message" transition:fly={{ y: 40, duration: 300 }}>
        <div class="header">
            <h2>Send Mii a Message</h2>
            <button class="close-x" on:click={close} aria-label="Close">✕</button>
        </div>

        {#if sent}
            <div class="sent-state">
                <p class="stamp">✔</p>
                <p>Message sent! I'll get back to you soon.</p>
            </div>
        {:else}
            <form on:submit|preventDefault={handleSubmit}>
                <input type="text" placeholder="Your name" bind:value={name} required />
                <input type="email" placeholder="Your email" bind:value={email} required />
                <textarea placeholder="Your message" rows="4" bind:value={message} required></textarea>
                <button type="submit" class="send-btn" disabled={sending}>
                    {sending ? 'Sending...' : 'Send'}
                </button>
            </form>

            <div class="direct-links">
                <a href="mailto:atetelba@uwo.ca">or email me directly</a>
            </div>
        {/if}
    </div>
</div>

<style>
    .backdrop {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        padding: 16px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .envelope {
        width: 90%;
        max-width: 420px;
        background: white;
        border-radius: 16px;
        border: 3px solid var(--wii-blue);
        box-shadow: 0 0 20px var(--wii-glow);
        padding: 24px;
        box-sizing: border-box;
        max-height: 100%;
        overflow-y: auto;
        outline: none;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .header h2 {
        margin: 0;
        color: #555;
        font-size: 1.3rem;
    }

    .close-x {
        background: none;
        border: none;
        font-size: 1.4rem;
        font-weight: bold;
        color: #999;
        cursor: pointer;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.15s, color 0.15s;
    }

    .close-x:hover {
        background: #f0f0f0;
        color: var(--wii-blue);
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    input, textarea {
        padding: 10px 14px;
        border-radius: 10px;
        border: 2px solid #ddd;
        font-family: inherit;
        font-size: 0.95rem;
        resize: none;
    }

    input:focus, textarea:focus {
        outline: none;
        border-color: var(--wii-blue);
    }

    .send-btn {
        margin-top: 6px;
        padding: 10px;
        border-radius: 30px;
        border: 2px solid var(--wii-blue-dark);
        background: var(--wii-blue);
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.1s;
    }

    .send-btn:hover:not(:disabled) {
        transform: scale(1.02);
    }

    .send-btn:disabled {
        opacity: 0.6;
        cursor: default;
    }

    .direct-links {
        text-align: center;
        margin-top: 14px;
    }

    .direct-links a {
        color: var(--wii-blue);
        font-size: 0.9rem;
        text-decoration: none;
    }

    .sent-state {
        text-align: center;
        padding: 20px 0;
        color: #666;
    }

    .stamp {
        font-size: 2.5rem;
        color: var(--wii-blue);
        margin: 0 0 10px;
    }
</style>