<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Footer from "$lib/Components/Footer.svelte";
	import Grid from "$lib/Components/Grid.svelte";
	import ControlPanel from "$lib/Components/ControlPanel.svelte";
	import MailModal from "$lib/Components/MailModal.svelte";

	let showControlPanel = false;
	let showMail = false;

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		if (browser) document.body.style.overflow = '';
	});
</script>

<div class="page">
  <Grid />
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
</div>

<style>
  .page {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background: repeating-linear-gradient(
      0deg,
      #ededed,
      #ededed 3px,
      #e6e6e6 3px,
      #e6e6e6 6px
    );
  }
</style>