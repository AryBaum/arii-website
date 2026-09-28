<script>
    import { onMount } from 'svelte';

    /** URL of the PDF to show */
    export let src;

    /** @type {HTMLDivElement} */
    let container;
    /** @type {'loading' | 'ready' | 'error'} */
    let status = 'loading';

    // Phones can't display embedded PDFs, so we draw each page ourselves with
    // PDF.js. It's only loaded here, so it doesn't slow down the rest of the site.
    onMount(() => {
        let cancelled = false;

        (async () => {
            try {
                const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
                const { default: workerSrc } = await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url');
                pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

                const pdf = await pdfjs.getDocument({ url: src }).promise;
                const width = container.clientWidth;
                // Extra resolution so text stays sharp when pinch-zooming
                const quality = Math.min(3, (window.devicePixelRatio || 1) * 1.5);

                for (let n = 1; n <= pdf.numPages && !cancelled; n++) {
                    const page = await pdf.getPage(n);
                    const base = page.getViewport({ scale: 1 });
                    const viewport = page.getViewport({ scale: (width / base.width) * quality });

                    const canvas = document.createElement('canvas');
                    canvas.width = Math.floor(viewport.width);
                    canvas.height = Math.floor(viewport.height);
                    canvas.className = 'pdf-page';
                    canvas.setAttribute('aria-label', `Resume page ${n} of ${pdf.numPages}`);
                    container.appendChild(canvas);

                    await page.render({ canvas, viewport }).promise;
                    if (n === 1) status = 'ready';
                }
            } catch (e) {
                console.error('Could not render PDF', e);
                if (!cancelled) status = 'error';
            }
        })();

        return () => (cancelled = true);
    });
</script>

<div class="pdf-viewer">
    {#if status === 'loading'}
        <p class="note">Loading resume…</p>
    {:else if status === 'error'}
        <p class="note">Couldn't display the resume here. <a href={src} target="_blank" rel="noopener">Open the PDF</a> instead.</p>
    {/if}
    <div class="pages" bind:this={container}></div>
</div>

<style>
    .pdf-viewer {
        background: #e9eaee;
        padding: 12px;
    }

    .pages {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .pages :global(.pdf-page) {
        width: 100%;
        height: auto;
        display: block;
        background: white;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }

    .note {
        text-align: center;
        color: #888;
        margin: 24px 0;
    }

    .note a {
        color: var(--wii-blue);
    }
</style>
