<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Footer from "$lib/Components/Footer.svelte";
	import Grid from "$lib/Components/Grid.svelte";
	import ControlPanel from "$lib/Components/ControlPanel.svelte";
	import MailModal from "$lib/Components/MailModal.svelte";
	import Intro from "$lib/Components/Intro.svelte";
	import { computeLayout } from '$lib/wiiLayout.js';

	let showControlPanel = false;
	let showMail = false;

	// The grid and footer are sized together from the screen size,
	// using the real Wii Menu's proportions (see $lib/wiiLayout.js)
	let pageW = 0;
	let pageH = 0;
	$: layout = pageW && pageH ? computeLayout(pageW, pageH) : null;

	// Lock scrolling only while the Wii Menu is on screen. Don't use a
	// :global(body) style for this — SvelteKit keeps page CSS loaded after you
	// navigate away, which used to make the case studies unscrollable.
	onMount(() => {
		document.body.classList.add('no-scroll');
	});

	onDestroy(() => {
		if (browser) document.body.classList.remove('no-scroll');
	});
</script>

<svelte:head>
	<title>Arii Menu</title>
</svelte:head>

<div
	class="page"
	bind:clientWidth={pageW}
	bind:clientHeight={pageH}
	style:--fh={layout ? `${layout.footerH}px` : null}
	style:--footer-btn={layout ? `${layout.button}px` : null}
	style:--time-font={layout ? `${layout.timeFont}px` : null}
	style:--date-font={layout ? `${layout.dateFont}px` : null}
>
  <Grid {layout} />
  <Footer
    on:openControlPanel={() => showControlPanel = true}
    on:openMail={() => showMail = true}
  />

  {#if showControlPanel}
    <ControlPanel on:close={() => showControlPanel = false} />
  {/if}

  {#if showMail}
    <MailModal on:close={() => showMail = false} />
  {/if}

  <!-- Skeleton loader + warning screen, once per visit -->
  <Intro {layout} />
</div>

<style>
  .page {
    /* Fallbacks until the layout is measured (and for the server render) */
    --fh: clamp(104px, 25vh, 300px);
    --footer-btn: clamp(60px, calc(var(--fh) * 0.58), 200px);
    --time-font: min(calc(var(--fh) * 0.3), 10vw);
    --date-font: min(calc(var(--fh) * 0.15), 5.5vw);

    height: 100vh;
    height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--wii-stripes);
  }
</style>
