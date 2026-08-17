<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';

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
            const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
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

<div class="backdrop" on:click|self={close}>
    <div class="envelope" transition:fly={{ y: 40, duration: 300 }}>
        <div class="header">
            <h2>Send Mii a Message</h2>
            <button class="close-x" on:click={close}>✕</button>
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
                <a href="mailto:you@example.com">or email me directly</a>
            </div>
        {/if}
    </div>
</div>

<style>
    .backdrop {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
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
        border: 3px solid #58cdf8;
        box-shadow: 0 0 20px rgba(88, 205, 248, 0.5);
        padding: 24px;
        box-sizing: border-box;
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
        font-size: 1.2rem;
        color: #999;
        cursor: pointer;
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
        border-color: #58cdf8;
    }

    .send-btn {
        margin-top: 6px;
        padding: 10px;
        border-radius: 30px;
        border: 2px solid #48c5f3;
        background: #58cdf8;
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
        color: #58cdf8;
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
        color: #58cdf8;
        margin: 0 0 10px;
    }
</style>