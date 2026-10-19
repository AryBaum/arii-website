<script>
    import { launchTo } from '$lib/transitions.js';
    import { playSound } from '$lib/sound.js';
    import footerSfx from '$lib/assets/sfx/Footer.wav';
    import hoverSfx from '$lib/assets/sfx/Hover.wav';
    import selectSfx from '$lib/assets/sfx/Select.wav';
    import { onMount, tick } from 'svelte';
    import CaseStudyBlock from '$lib/Components/CaseStudyBlock.svelte';

    export let data;
    $: project = data?.project;
    $: prev = data?.prev;
    $: next = data?.next;

    const backToMenu = () => {
        playSound(footerSfx, 0.5);
        launchTo('/');
    };

    /** @param {string} slug */
    const goToProject = (slug) => {
        playSound(footerSfx, 0.5);
        launchTo(`/projects/${slug}`);
    };

    // Section links for the sidebar: the hero/overview, then every section heading
    /** @param {string} text */
    const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    $: toc = project
        ? [{ id: 'overview', label: 'Overview' }, ...project.sections.map((/** @type {any} */ s) => ({ id: slugify(s.heading), label: s.heading }))]
        : [];

    let activeId = 'overview';
    /** @type {HTMLElement | undefined} */
    let tocList;

    // Highlight the last section whose heading has scrolled past the top of the screen
    function updateActive() {
        if (!toc.length) return;
        let current = toc[0].id;
        for (const { id } of toc) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= 140) current = id;
        }
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) current = toc[toc.length - 1].id;
        if (current !== activeId) {
            activeId = current;
            // On phones the links sit in a sideways-scrolling bar, so keep the active one in view
            tick().then(() => {
                const link = /** @type {HTMLElement | null | undefined} */ (tocList?.querySelector('.active'));
                if (link && tocList && tocList.scrollWidth > tocList.clientWidth) {
                    tocList.scrollTo({ left: link.offsetLeft - tocList.offsetLeft - 16, behavior: 'smooth' });
                }
            });
        }
    }

    // Stops the previous jump's position correction (see jumpTo)
    let cancelSettle = () => {};

    /** @param {string} id */
    function jumpTo(id) {
        cancelSettle();
        playSound(selectSfx, 0.4);
        const el = document.getElementById(id);
        if (!el) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

        // Lazy images above the target can load mid-scroll and push it down the page,
        // so once scrolling stops, snap the heading back into place (a few tries at most).
        // Any scrolling the visitor does themselves cancels this.
        let tries = 0;
        /** @type {ReturnType<typeof setTimeout>} */
        let timer;
        const settle = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
                const off = el.getBoundingClientRect().top - margin;
                const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
                if (Math.abs(off) > 4 && !atBottom && tries++ < 3) {
                    el.scrollIntoView({ behavior: 'auto', block: 'start' });
                    settle();
                } else {
                    cancelSettle();
                    updateActive();
                }
            }, 150);
        };
        const userScroll = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
        cancelSettle = () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', settle);
            userScroll.forEach((ev) => window.removeEventListener(ev, cancelSettle));
            cancelSettle = () => {};
        };
        window.addEventListener('scroll', settle, { passive: true });
        userScroll.forEach((ev) => window.addEventListener(ev, cancelSettle, { passive: true }));
        settle();
    }

    onMount(() => {
        let frame = 0;
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(updateActive);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        updateActive();
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(frame);
            cancelSettle();
        };
    });
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
    {#key project.slug}
    <div class="case-layout">
    <aside class="case-sidebar channel-in" aria-label="Case study sections">
        <nav class="toc-card">
            <p class="toc-title">{project.name}</p>
            <ul class="toc-list" bind:this={tocList}>
                {#each toc as item}
                    <li>
                        <a
                            href="#{item.id}"
                            class:active={activeId === item.id}
                            aria-current={activeId === item.id ? 'location' : undefined}
                            on:mouseenter={() => playSound(hoverSfx, 0.25)}
                            on:click|preventDefault={() => jumpTo(item.id)}
                        >{item.label}</a>
                    </li>
                {/each}
            </ul>
            <button class="back-btn toc-menu" on:click={backToMenu}>Arii Menu</button>
        </nav>
    </aside>

    <div class="case-study channel-in">
        <div class="breadcrumb">
            <button on:click={backToMenu}>&lt; Arii Menu</button>
            <span class="crumb-sep">/</span>
            <span>{project.name}</span>
        </div>

        <section class="hero" id="overview">
            <div class="hero-image">
                <img
                    src={project.coverImage}
                    alt={project.name}
                    on:error={(e) => (/** @type {HTMLImageElement} */ (e.currentTarget).src = '/placeholder.png')}
                />
            </div>
            <div class="hero-info">
                <h1>{project.name}</h1>
                <p class="tagline">{project.tagline}</p>

                <div class="facts">
                    <div class="fact"><span class="label">Role</span><span>{project.role}</span></div>
                    <div class="fact"><span class="label">Timeline</span><span>{project.timeline}</span></div>
                    {#if project.tools?.length}
                        <div class="fact"><span class="label">Tools</span><span>{project.tools.join(', ')}</span></div>
                    {/if}
                    {#if project.award}
                        <div class="fact"><span class="label">Award</span><span>{project.award}</span></div>
                    {/if}
                    {#if project.liveLink}
                        <a href={project.liveLink} target="_blank" class="live-link">{project.liveLinkLabel ?? 'View Live Site'} &#8594;</a>
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
            <section class="block-section" id={slugify(section.heading)}>
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
    </div>
    {/key}
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
        background: var(--wii-blue);
        color: white;
        border: none;
        border-radius: 30px;
        padding: 10px 24px;
        font-weight: bold;
        cursor: pointer;
    }

    .case-layout {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 28px;
    }

    .case-study {
        flex: 1;
        min-width: 0;
        max-width: 900px;
        margin: 0;
        padding: 40px 24px 100px;
        color: #4a4a4a;
        font-family: "Continuum", sans-serif;
    }

    .channel-in {
        animation: channel-in 0.6s cubic-bezier(0.22, 0.8, 0.3, 1) both;
    }

    /* "Channel boot": content settles in as the white flash fades */
    @keyframes channel-in {
        from { opacity: 0; transform: translateY(14px) scale(0.985); }
        to { opacity: 1; transform: none; }
    }

    @media (prefers-reduced-motion: reduce) {
        .channel-in { animation: none; }
    }

    /* Sections sidebar: a Wii-style panel that follows you down the page */
    .case-sidebar {
        position: sticky;
        top: 40px;
        width: 210px;
        flex-shrink: 0;
        margin-top: 76px;
        font-family: "Continuum", sans-serif;
    }

    .toc-card {
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 20px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        padding: 16px 12px;
        max-height: calc(100vh - 80px);
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    .toc-title {
        margin: 0 8px 10px;
        color: var(--wii-blue);
        font-weight: bold;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .toc-list {
        list-style: none;
        margin: 0 0 14px;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .toc-list a {
        display: block;
        padding: 7px 10px;
        border-radius: 12px;
        border-left: 3px solid transparent;
        color: #777;
        font-size: 0.85rem;
        line-height: 1.3;
        text-decoration: none;
        transition: background 0.15s, color 0.15s;
    }

    .toc-list a:hover {
        background: var(--wii-blue-soft);
        color: #444;
    }

    .toc-list a.active {
        background: var(--wii-blue-soft);
        border-left-color: var(--wii-blue);
        color: #333;
        font-weight: bold;
    }

    .toc-list a:focus-visible {
        outline: 2px solid var(--wii-blue);
        outline-offset: 2px;
    }

    .toc-menu {
        width: 100%;
    }

    [id] {
        scroll-margin-top: 24px;
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
        color: var(--wii-blue);
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
        color: var(--wii-blue);
        font-weight: bold;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .live-link {
        margin-top: 10px;
        color: white;
        background: var(--wii-blue);
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
        border-left: 4px solid var(--wii-blue);
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
        border-color: var(--wii-blue);
    }

    .back-btn {
        background: var(--wii-blue);
        color: white;
        border: none;
        border-radius: 30px;
        padding: 10px 24px;
        font-weight: bold;
        cursor: pointer;
    }

    /* Narrower screens: the sidebar becomes a sticky bar of section chips above the content */
    @media (max-width: 1180px) {
        .case-layout {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
        }

        .case-sidebar {
            width: auto;
            top: 0;
            margin: 0;
            z-index: 10;
        }

        .toc-card {
            flex-direction: row;
            align-items: center;
            gap: 8px;
            max-height: none;
            border-radius: 0;
            border-width: 0 0 2px;
            padding: 10px 16px;
        }

        .toc-title { display: none; }

        .toc-list {
            flex-direction: row;
            flex: 1;
            margin: 0;
            overflow-x: auto;
            scrollbar-width: none;
            gap: 6px;
        }

        .toc-list::-webkit-scrollbar { display: none; }

        .toc-list a {
            white-space: nowrap;
            border: 2px solid #e0e0e0;
            border-radius: 30px;
            padding: 6px 12px;
        }

        .toc-list a.active { border-color: var(--wii-blue); }

        .toc-menu {
            order: -1;
            width: auto;
            flex-shrink: 0;
            padding: 8px 16px;
        }

        .case-study { margin: 0 auto; width: 100%; }

        [id] { scroll-margin-top: 76px; }
    }

    @media (max-width: 700px) {
        .hero { flex-direction: column; }
        .hero-image { min-height: 200px; }
        .hero-info { padding: 24px; }
        .case-nav { flex-direction: column; }
    }
</style>