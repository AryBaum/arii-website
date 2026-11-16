<script>
    import { playSound } from '$lib/sound.js';
    import { launchTo } from '$lib/transitions.js';
    import footerSfx from '$lib/assets/sfx/Footer.wav';
    import hoverSfx from '$lib/assets/sfx/Hover.wav';
    import MiiWave from '$lib/assets/channels/MiiWave.webp';
    import MiiStill from '$lib/assets/channels/MiiStill.webp';

    const EMAIL = 'atetelba@uwo.ca';
    const LINKEDIN = 'https://www.linkedin.com/in/arielle-tetelbaum';
    const GITHUB = 'https://github.com/AryBaum';

    // Set to an imported photo (e.g. `import Photo from '$lib/assets/Arielle.webp'`) to show it beside "Why UX"
    const PHOTO = null;

    const strengths = [
        {
            title: 'I design from the problem up',
            body: 'I start with who I\'m designing for and what\'s getting in their way, then map it out in FigJam before a single screen exists in Figma. My Throwback team won the Most Accessible award at Western Founders Network\'s Product Design Sprint.'
        },
        {
            title: 'I know how designs get built',
            body: 'I\'ve coded my own designs, so I know what\'s realistic to build, what engineers need from a handoff, and how to design around what the backend can actually support.'
        },
        {
            title: 'I\'ve been the user',
            body: 'I\'ve worked the front desk of a dental and healthcare clinic since 2020. Watching patients and staff fight confusing systems every day taught me how much calm, clear design matters.'
        }
    ];

    const timeline = [
        { when: 'Grade 10', what: 'Built my first websites with HTML and CSS.' },
        { when: 'Grades 11–12', what: 'Made Java games with my co-developer, Sam: Brick Breaker, Slider, Rush Hour and a text adventure.' },
        { when: 'Year 1', what: 'Learned the principles behind good design alongside my CS courses.' },
        { when: 'Year 2', what: 'Led the design of Party Islands, a multiplayer typing game, and realized UX was what I\'d been drawn to all along.' },
        { when: 'Now', what: 'Designing for trACT Software and 3D Western, and working through Google\'s UX Design Certificate.' }
    ];

    const backToMenu = () => {
        playSound(footerSfx, 0.5);
        launchTo('/');
    };

    const openResume = () => {
        playSound(footerSfx, 0.5);
        launchTo('/resume');
    };

    const hover = () => playSound(hoverSfx, 0.25);
</script>

<svelte:head>
    <title>About Mii — Arii</title>
    <meta name="description" content="Arielle Tetelbaum is a UI/UX designer studying Computer Science and Game Development at Western University." />
</svelte:head>

<div class="about-page channel-in">
    <div class="breadcrumb">
        <button on:click={backToMenu}>&lt; Arii Menu</button>
        <span class="crumb-sep">/</span>
        <span>About Mii</span>
    </div>

    <!-- The Mii says hi, like a Mii talking in a Wii game -->
    <header class="intro">
        <!-- Waves once, then rests; reduced-motion visitors get the still pose -->
        <picture class="mii-wrap">
            <source srcset={MiiStill} media="(prefers-reduced-motion: reduce)" />
            <img class="mii" src={MiiWave} alt="Arielle's Mii waving hello" width="410" height="424" />
        </picture>
        <div class="bubble">
            <h1>I can't use an app without noticing what's confusing and sketching a fix, so I made it my job.</h1>
            <p class="sub">I'm Arielle, a UI/UX designer studying Computer Science, with a minor in Game Development, at Western University.</p>
            <div class="actions">
                <button class="btn primary" on:mouseenter={hover} on:click={openResume}>View Resume</button>
                <a class="btn" href="mailto:{EMAIL}" on:mouseenter={hover}>Email</a>
                <a class="btn" href={LINKEDIN} target="_blank" rel="noopener" on:mouseenter={hover}>LinkedIn</a>
                <a class="btn" href={GITHUB} target="_blank" rel="noopener" on:mouseenter={hover}>GitHub</a>
            </div>
        </div>
    </header>

    <section class="block">
        <h2>What I Bring</h2>
        <div class="strengths">
            {#each strengths as s}
                <div class="strength">
                    <p class="strength-title">{s.title}</p>
                    <p>{s.body}</p>
                </div>
            {/each}
        </div>
    </section>

    <section class="block">
        <h2>How I Got Here</h2>
        <ol class="timeline">
            {#each timeline as step}
                <li>
                    <span class="when">{step.when}</span>
                    <span class="what">{step.what}</span>
                </li>
            {/each}
        </ol>
    </section>

    <section class="block">
        <h2>Why UX</h2>
        <div class="why-wrap" class:has-photo={PHOTO}>
            <blockquote class="why">
                My favourite part of UX is the psychology. I'm a big empath, so I'm always imagining how someone will
                feel the moment they see a screen. Will this red make them anxious? Will they know what to tap next?
                That's probably how I ended up leading design on every team project before I knew it was a job.
            </blockquote>
            {#if PHOTO}
                <img class="photo" src={PHOTO} alt="Arielle Tetelbaum" />
            {/if}
        </div>
    </section>

    <section class="contact">
        <p class="contact-title">Let's make something people enjoy using.</p>
        <p class="contact-sub">The fastest way to reach me is email: <a href="mailto:{EMAIL}">{EMAIL}</a></p>
        <div class="actions centered">
            <a class="btn primary" href="mailto:{EMAIL}" on:mouseenter={hover}>Say Hi</a>
            <button class="btn" on:mouseenter={hover} on:click={backToMenu}>Arii Menu</button>
        </div>
    </section>
</div>

<style>
    .about-page {
        max-width: 900px;
        margin: 0 auto;
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
        padding: 8px 4px;
        margin: -8px -4px;
    }

    .crumb-sep { color: #ccc; }

    /* Mii + speech bubble */
    .intro {
        display: flex;
        align-items: center;
        gap: 28px;
        margin-bottom: 48px;
    }

    .mii-wrap {
        flex: 0 0 220px;
    }

    .mii {
        display: block;
        width: 100%;
        height: auto;
        /* The render is cut off at the waist, so fade it out instead of a hard edge */
        -webkit-mask-image: linear-gradient(to bottom, #000 82%, transparent);
        mask-image: linear-gradient(to bottom, #000 82%, transparent);
    }

    .bubble {
        position: relative;
        flex: 1;
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 24px;
        padding: 26px 28px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }

    /* Tail pointing back at the Mii */
    .bubble::before {
        content: "";
        position: absolute;
        left: -11px;
        top: 50%;
        width: 18px;
        height: 18px;
        background: white;
        border-left: 2px solid #e0e0e0;
        border-bottom: 2px solid #e0e0e0;
        transform: translateY(-50%) rotate(45deg);
    }

    h1 {
        margin: 0 0 10px;
        font-size: 1.7rem;
        line-height: 1.3;
        color: #333;
    }

    .sub {
        margin: 0 0 20px;
        line-height: 1.6;
        color: #555;
    }

    /* Pill buttons, like the rest of the site */
    .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .actions.centered { justify-content: center; }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        padding: 0 20px;
        border-radius: 30px;
        border: 2px solid #ddd;
        background: white;
        color: #555;
        font-family: inherit;
        font-size: 0.9rem;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
        box-sizing: border-box;
        transition: border-color 0.15s, transform 0.15s;
    }

    .btn:hover {
        border-color: var(--wii-blue);
        transform: translateY(-1px);
    }

    .btn.primary {
        background: var(--wii-blue);
        border-color: var(--wii-blue);
        color: white;
    }

    .btn.primary:hover { background: var(--wii-blue-dark); }

    .btn:focus-visible,
    .breadcrumb button:focus-visible,
    .contact-sub a:focus-visible {
        outline: 2px solid var(--wii-blue-dark);
        outline-offset: 2px;
    }

    /* Sections */
    .block { margin-bottom: 44px; }

    .block h2 {
        font-size: 1.4rem;
        color: #333;
        border-left: 4px solid var(--wii-blue);
        padding-left: 12px;
        margin: 0 0 18px;
    }

    .strengths {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    .strength {
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 14px;
        padding: 18px;
    }

    .strength p {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.55;
        color: #666;
    }

    .strength .strength-title {
        font-weight: bold;
        color: #333;
        font-size: 1rem;
        margin-bottom: 8px;
    }

    .timeline {
        list-style: none;
        margin: 0;
        padding: 0;
        border-left: 3px solid var(--wii-blue-soft);
    }

    .timeline li {
        position: relative;
        display: flex;
        gap: 16px;
        padding: 0 0 18px 22px;
        line-height: 1.5;
    }

    .timeline li:last-child { padding-bottom: 0; }

    /* Dot on the line, like a channel indicator light */
    .timeline li::before {
        content: "";
        position: absolute;
        left: -8px;
        top: 4px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: white;
        border: 3px solid var(--wii-blue);
        box-sizing: border-box;
    }

    .when {
        flex: 0 0 100px;
        font-weight: bold;
        color: #333;
        font-size: 0.9rem;
    }

    .what {
        color: #555;
        font-size: 0.95rem;
    }

    .why-wrap.has-photo {
        display: grid;
        grid-template-columns: 1fr 220px;
        gap: 28px;
        align-items: center;
    }

    .why {
        margin: 0;
        padding: 4px 20px;
        border-left: 4px solid var(--wii-blue);
        font-size: 1.05rem;
        line-height: 1.7;
        color: #555;
        font-style: italic;
    }

    .photo {
        width: 100%;
        border-radius: 20px;
        border: 2px solid #e0e0e0;
        display: block;
    }

    .contact {
        text-align: center;
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 20px;
        padding: 32px 24px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }

    .contact-title {
        margin: 0 0 6px;
        font-size: 1.3rem;
        font-weight: bold;
        color: #333;
    }

    .contact-sub {
        margin: 0 0 18px;
        color: #777;
    }

    .contact-sub a {
        color: #333;
        font-weight: bold;
        text-decoration-color: var(--wii-blue);
        text-decoration-thickness: 2px;
        text-underline-offset: 3px;
    }

    @media (max-width: 760px) {
        .intro {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
        }

        .mii-wrap { flex-basis: auto; width: 160px; }

        .bubble { align-self: stretch; padding: 22px; }

        /* Tail points up at the Mii instead */
        .bubble::before {
            left: 64px;
            top: -11px;
            transform: rotate(135deg);
        }

        h1 { font-size: 1.4rem; }

        .strengths { grid-template-columns: 1fr; }
        .timeline li { flex-direction: column; gap: 2px; }
        .when { flex-basis: auto; }
        .why-wrap.has-photo { grid-template-columns: 1fr; }
        .photo { max-width: 260px; }
    }

    @media (max-width: 600px) {
        .about-page { padding: 20px 16px 60px; }
        .actions .btn { flex: 1 1 calc(50% - 5px); }
    }
</style>
