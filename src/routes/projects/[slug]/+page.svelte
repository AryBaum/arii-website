<script>
    import { goto } from '$app/navigation';
    import { playSound } from '$lib/sound.js';
    import footerSfx from '$lib/assets/sfx/Footer.wav';
    import CaseStudyBlock from '$lib/Components/CaseStudyBlock.svelte';

    export let data;
    $: project = data?.project;
    $: prev = data?.prev;
    $: next = data?.next;

    const backToMenu = () => {
        playSound(footerSfx, 0.5);
        goto('/');
    };

    const goToProject = (slug) => {
        playSound(footerSfx, 0.5);
        goto(`/projects/${slug}`);
    };
</script>

<svelte:head>
    <title>{project ? `${project.name} — Arii` : 'Project — Arii'}</title>
</svelte:head>

{#if !project}
    <div class="not-found">
        <p>This project couldn't be found.</p>
        <button on:click={backToMenu}>&lt; Back to Arii Menu</button>
    </div>
{:else}
    <div class="case-study">
        <div class="breadcrumb">
            <button on:click={backToMenu}>&lt; Arii Menu</button>
            <span class="crumb-sep">/</span>
            <span>{project.name}</span>
        </div>

        <section class="hero">
            <div class="hero-image">
                <img
                    src={project.coverImage}
                    alt={project.name}
                    on:error={(e) => e.target.src = '/placeholder.png'}
                />
            </div>
            <div class="hero-info">
                <h1>{project.name}</h1>
                <p class="tagline">{project.tagline}</p>

                <div class="facts">
                    <div class="fact"><span class="label">Role</span><span>{project.role}</span></div>
                    <div class="fact"><span class="label">Timeline</span><span>{project.timeline}</span></div>
                    <div class="fact"><span class="label">Tools</span><span>{project.tools.join(', ')}</span></div>
                    {#if project.liveLink}
                        <a href={project.liveLink} target="_blank" class="live-link">View Live Site &#8594;</a>
                    {/if}
                </div>
            </div>
        </section>

        {#if project.overview}
            <section class="block-section">
                <p class="overview">{project.overview}</p>
            </section>
        {/if}

        {#each project.sections as section}
            <section class="block-section">
                <h2>{section.heading}</h2>
                {#each section.blocks as block}
                    <CaseStudyBlock {block} />
                {/each}
            </section>
        {/each}

        <div class="case-nav">
            {#if prev}
                <button class="nav-project" on:click={() => goToProject(prev.slug)}>&larr; {prev.name}</button>
            {:else}<div></div>{/if}
            <button class="back-btn" on:click={backToMenu}>Arii Menu</button>
            {#if next}
                <button class="nav-project" on:click={() => goToProject(next.slug)}>{next.name} &rarr;</button>
            {:else}<div></div>{/if}
        </div>
    </div>
{/if}

<style>
    .not-found {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        gap: 16px;
        color: #777;
    }

    .not-found button {
        background: #58cdf8;
        color: white;
        border: none;
        border-radius: 30px;
        padding: 10px 24px;
        font-weight: bold;
        cursor: pointer;
    }

    .case-study {
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 24px 100px;
        color: #4a4a4a;
        font-family: "Continuum", sans-serif;
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        font-size: 0.95rem;
        color: #888;
    }

    .breadcrumb button {
        background: none;
        border: none;
        color: #58cdf8;
        font-weight: bold;
        cursor: pointer;
        font-size: 0.95rem;
        padding: 0;
    }

    .crumb-sep { color: #ccc; }

    .hero {
        display: flex;
        gap: 32px;
        background: white;
        border-radius: 20px;
        border: 2px solid #e0e0e0;
        overflow: hidden;
        margin-bottom: 40px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }

    .hero-image {
        flex: 1.2;
        min-height: 280px;
        background: #eee;
    }

    .hero-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .hero-info {
        flex: 1;
        padding: 28px 28px 28px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .hero-info h1 {
        margin: 0 0 8px;
        font-size: 2rem;
        color: #333;
    }

    .tagline {
        color: #777;
        line-height: 1.5;
        margin: 0 0 20px;
    }

    .facts {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .fact {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
    }

    .fact .label {
        color: #58cdf8;
        font-weight: bold;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .live-link {
        margin-top: 10px;
        color: white;
        background: #58cdf8;
        text-decoration: none;
        text-align: center;
        padding: 10px;
        border-radius: 30px;
        font-weight: bold;
        font-size: 0.9rem;
    }

    .overview {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #555;
        margin-bottom: 40px;
    }

    .block-section {
        margin-bottom: 44px;
    }

    .block-section h2 {
        font-size: 1.4rem;
        color: #333;
        border-left: 4px solid #58cdf8;
        padding-left: 12px;
        margin-bottom: 18px;
    }

    .case-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin-top: 30px;
    }

    .nav-project {
        background: white;
        border: 2px solid #ddd;
        border-radius: 30px;
        padding: 10px 18px;
        font-size: 0.9rem;
        color: #666;
        cursor: pointer;
        transition: border-color 0.15s;
    }

    .nav-project:hover {
        border-color: #58cdf8;
    }

    .back-btn {
        background: #58cdf8;
        color: white;
        border: none;
        border-radius: 30px;
        padding: 10px 24px;
        font-weight: bold;
        cursor: pointer;
    }

    @media (max-width: 700px) {
        .hero { flex-direction: column; }
        .hero-image { min-height: 200px; }
        .hero-info { padding: 24px; }
        .case-nav { flex-direction: column; }
    }
</style>