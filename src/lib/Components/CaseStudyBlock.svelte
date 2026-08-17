<script>
    export let block;

    function handleImgError(e) {
        e.target.src = '/placeholder.png';
        e.target.classList.add('img-missing');
    }
</script>

{#if block.type === "text"}
    <p class="block-text">{block.content}</p>

{:else if block.type === "image"}
    <figure class="block-image">
        <img src={block.src} alt={block.caption || ""} loading="lazy" on:error={handleImgError} />
        {#if block.caption}<figcaption>{block.caption}</figcaption>{/if}
    </figure>

{:else if block.type === "imageRow"}
    <div class="block-image-row">
        {#each block.images as img}
            <figure>
                <img src={img.src} alt={img.caption || ""} loading="lazy" on:error={handleImgError} />
                {#if img.caption}<figcaption>{img.caption}</figcaption>{/if}
            </figure>
        {/each}
    </div>

{:else if block.type === "quote"}
    <blockquote class="block-quote">
        <p>"{block.content}"</p>
        {#if block.attribution}— {block.attribution}{/if}
    </blockquote>

{:else if block.type === "decision"}
    <div class="decision-card">
        <p class="decision-title">{block.decision}</p>
        <p class="decision-why"><span class="dot">Why</span>{block.why}</p>
        {#if block.tradeoff}
            <p class="decision-tradeoff"><span class="dot">Trade-off</span>{block.tradeoff}</p>
        {/if}
    </div>
{/if}

<style>
    .block-text {
        line-height: 1.7;
        color: #555;
        font-size: 1rem;
        margin: 0 0 20px;
    }

    .block-image {
        margin: 0 0 24px;
    }

    .block-image img {
        width: 100%;
        border-radius: 12px;
        border: 1px solid #eee;
        display: block;
        min-height: 160px;
        background: #f4f4f4;
        object-fit: cover;
    }

    .block-image figcaption {
        margin-top: 8px;
        font-size: 0.85rem;
        color: #999;
        text-align: center;
        font-style: italic;
    }

    .block-image-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin: 0 0 24px;
    }

    .block-image-row img {
        width: 100%;
        border-radius: 12px;
        border: 1px solid #eee;
        display: block;
        min-height: 160px;
        background: #f4f4f4;
        object-fit: cover;
    }

    .block-image-row figcaption {
        margin-top: 6px;
        font-size: 0.8rem;
        color: #999;
        text-align: center;
        font-style: italic;
    }

    :global(.img-missing) {
        opacity: 0.5;
    }

    .block-quote {
        border-left: 4px solid #58cdf8;
        padding: 4px 20px;
        margin: 0 0 24px;
        color: #444;
    }

    .block-quote p {
        font-size: 1.1rem;
        font-style: italic;
        margin: 0 0 6px;
    }

    .decision-card {
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 14px;
        padding: 18px;
        margin-bottom: 16px;
    }

    .decision-title {
        font-weight: bold;
        color: #333;
        margin: 0 0 10px;
    }

    .decision-why, .decision-tradeoff {
        font-size: 0.9rem;
        color: #666;
        margin: 0 0 6px;
        line-height: 1.5;
    }

    .dot {
        display: inline-block;
        color: #58cdf8;
        font-weight: bold;
        font-size: 0.75rem;
        text-transform: uppercase;
        margin-right: 8px;
    }

    @media (max-width: 600px) {
        .block-image-row {
            grid-template-columns: 1fr;
        }
    }
</style>